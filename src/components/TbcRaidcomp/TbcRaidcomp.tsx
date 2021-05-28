import { Button } from "@chakra-ui/button";
import { Chance } from "chance";
import { MdDeleteForever, MdOpenInNew } from "react-icons/md";
import deepEqual from "fast-deep-equal";
import { Input } from "@chakra-ui/input";
import {
  Container,
  Flex,
  FlexProps,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { AsyncResult } from "typed-utilities";
import Head from "next/head";
import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";
import createJsonUrlCodec from "json-url";
import { Spinner } from "@chakra-ui/spinner";
import { Checkbox, Heading, Icon, Textarea } from "@chakra-ui/react";

import { useAsync } from "../../lib/useAsync";
import { isNotNull } from "../../lib/types";
import { useLocationHash } from "../../lib/useLocationHash";

import ertLua from "./ert.lua";

const pageTitle = `TBC Raidcomp`;

declare const fengari: {
  ert_lua_input: string;
  readonly load: (source: string) => () => unknown;
};

let runErtLua: null | (() => unknown) = null;

const createErtRaidgroupsImportString = (groups: Groups): string => {
  if (!runErtLua) {
    runErtLua = fengari.load(ertLua);
  }
  fengari.ert_lua_input = groups
    .map((characterName) => characterName ?? `dummy`)
    .join(` `);
  return z.string().parse(runErtLua());
};

const jsonUrlCodec = createJsonUrlCodec(`lzw`);

const CharacterSpec = z.object({
  characterSpecName: z.string(),
  role: z.enum([`Tank`, `Heal`, `Ranged`, `Melee`]),
  iconHref: z.string(),
  wowheadId: z.string().length(1),
});

type CharacterSpec = z.infer<typeof CharacterSpec>;

const CharacterClass = z.object({
  characterClassName: z.string(),
  htmlColor: z.string(),
  characterSpecs: z.array(CharacterSpec).length(3),
});

type CharacterClass = z.infer<typeof CharacterClass>;
const CharacterName = z.string();

const Character = z
  .object({
    characterName: CharacterName,
    characterClassName: z.string(),
    characterSpecName: z.string(),
  })
  .refine((character) =>
    characterClasses.find(
      ({ characterClassName, characterSpecs }) =>
        characterClassName === character.characterClassName &&
        characterSpecs.some(
          ({ characterSpecName }) =>
            characterSpecName === character.characterSpecName,
        ),
    ),
  );

type Character = z.infer<typeof Character>;

const NUM_GROUPS = 8;
const GROUP_SIZE = 5;

const Groups = z
  .array(z.union([z.null(), CharacterName]))
  .length(NUM_GROUPS * GROUP_SIZE);
type Groups = z.infer<typeof Groups>;

const Roster = z.object({
  characters: z.array(Character),
  groups: Groups,
});

type Roster = z.infer<typeof Roster>;

const characterClasses: CharacterClass[] = [
  {
    characterClassName: `Druid`,
    htmlColor: `#FF7C0A`,
    characterSpecs: [
      {
        characterSpecName: `Balance`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_nature_starfall.jpg`,
        wowheadId: `x`,
      },
      {
        characterSpecName: `Feral`,
        role: `Tank`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_racial_bearform.jpg`,
        wowheadId: `v`,
      },
      {
        characterSpecName: `Restoration`,
        role: `Heal`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_nature_healingtouch.jpg`,
        wowheadId: `w`,
      },
    ],
  },
  {
    characterClassName: `Hunter`,
    htmlColor: `#AAD372`,
    characterSpecs: [
      {
        characterSpecName: `Beast Mastery`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_beasttaming.jpg`,
        wowheadId: `C`,
      },
      {
        characterSpecName: `Marksmanship`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_marksmanship.jpg`,
        wowheadId: `F`,
      },
      {
        characterSpecName: `Survival`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_swiftstrike.jpg`,
        wowheadId: `D`,
      },
    ],
  },
  {
    characterClassName: `Mage`,
    htmlColor: `#3FC7EB`,
    characterSpecs: [
      {
        characterSpecName: `Arcane`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_magicalsentry.jpg`,
        wowheadId: `d`,
      },
      {
        characterSpecName: `Fire`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_fire_firebolt02.jpg`,
        wowheadId: `b`,
      },
      {
        characterSpecName: `Ice`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_frost_frostbolt02.jpg`,
        wowheadId: `c`,
      },
    ],
  },
  {
    characterClassName: `Paladin`,
    htmlColor: `#F48CBA`,
    characterSpecs: [
      {
        characterSpecName: `Holy`,
        role: `Heal`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_holybolt.jpg`,
        wowheadId: `H`,
      },
      {
        characterSpecName: `Protection`,
        role: `Tank`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_devotionaura.jpg`,
        wowheadId: `J`,
      },
      {
        characterSpecName: `Retribution`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_auraoflight.jpg`,
        wowheadId: `G`,
      },
    ],
  },
  {
    characterClassName: `Priest`,
    htmlColor: `#eee`,
    characterSpecs: [
      {
        characterSpecName: `Discipline`,
        role: `Heal`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_wordfortitude.jpg`,
        wowheadId: `n`,
      },
      {
        characterSpecName: `Holy`,
        role: `Heal`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_holybolt.jpg`,
        wowheadId: `n`,
      },
      {
        characterSpecName: `Shadow`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_shadowwordpain.jpg`,
        wowheadId: `n`,
      },
    ],
  },
  {
    characterClassName: `Rogue`,
    htmlColor: `#FFF468`,
    characterSpecs: [
      {
        characterSpecName: `Assassination`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_rogue_eviscerate.jpg`,
        wowheadId: `k`,
      },
      {
        characterSpecName: `Combat`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_backstab.jpg`,
        wowheadId: `j`,
      },
      {
        characterSpecName: `Subtelty`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_rogue_eviscerate.jpg`,
        wowheadId: `m`,
      },
    ],
  },
  {
    characterClassName: `Shaman`,
    htmlColor: `#0070DD`,
    characterSpecs: [
      {
        characterSpecName: `Elemental`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_nature_lightning.jpg`,
        wowheadId: `r`,
      },
      {
        characterSpecName: `Enhancement`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_nature_lightningshield.jpg`,
        wowheadId: `t`,
      },
      {
        characterSpecName: `Restoration`,
        role: `Heal`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_nature_magicimmunity.jpg`,
        wowheadId: `s`,
      },
    ],
  },
  {
    characterClassName: `Warlock`,
    htmlColor: `#8788EE`,
    characterSpecs: [
      {
        characterSpecName: `Affliction`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_deathcoil.jpg`,
        wowheadId: `z`,
      },
      {
        characterSpecName: `Demonology`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_metamorphosis.jpg`,
        wowheadId: `B`,
      },
      {
        characterSpecName: `Destruction`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_rainoffire.jpg`,
        wowheadId: `y`,
      },
    ],
  },
  {
    characterClassName: `Warrior`,
    htmlColor: `#C69B6D`,
    characterSpecs: [
      {
        characterSpecName: `Arms`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_rogue_eviscerate.jpg`,
        wowheadId: `f`,
      },
      {
        characterSpecName: `Fury`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_warrior_innerrage.jpg`,
        wowheadId: `h`,
      },
      {
        characterSpecName: `Protection`,
        role: `Tank`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/inv_shield_06.jpg`,
        wowheadId: `g`,
      },
    ],
  },
];
const findCharacterClass = (
  characterClassName: CharacterClass[`characterClassName`],
): CharacterClass | null =>
  characterClasses.find(
    (characterClass) =>
      characterClass.characterClassName === characterClassName,
  ) ?? null;

const findCharacterSpec = (
  { characterSpecs }: CharacterClass,
  characterSpecName: CharacterSpec[`characterSpecName`],
): CharacterSpec | null =>
  characterSpecs.find(
    (characterSpec) => characterSpec.characterSpecName === characterSpecName,
  ) ?? null;

const findCharacterClassSpecByWowheadId = (
  wowheadId: string,
): null | {
  readonly characterClass: CharacterClass;
  readonly characterSpec: CharacterSpec;
} => {
  for (const characterClass of characterClasses) {
    for (const characterSpec of characterClass.characterSpecs) {
      if (characterSpec.wowheadId === wowheadId) {
        return { characterClass, characterSpec };
      }
    }
  }
  return null;
};

const sortCharacters = (a: Character, b: Character): number =>
  a.characterClassName !== b.characterClassName
    ? a.characterClassName.localeCompare(b.characterClassName)
    : a.characterSpecName !== b.characterSpecName
    ? a.characterSpecName.localeCompare(b.characterSpecName)
    : a.characterName.localeCompare(b.characterName);

const findCharacter = (
  roster: Roster,
  characterName: Character[`characterName`],
): Character | null =>
  roster.characters.find(
    (character) => character.characterName === characterName,
  ) ?? null;

const zipCharacters = (
  roster: Roster,
): {
  readonly character: Character;
  readonly characterClass: CharacterClass;
  readonly characterSpec: CharacterSpec;
}[] =>
  roster.characters
    .map((character) => {
      const characterClass = findCharacterClass(character.characterClassName);
      if (!characterClass) {
        return null;
      }
      const characterSpec = findCharacterSpec(
        characterClass,
        character.characterSpecName,
      );
      if (!characterSpec) {
        return null;
      }
      return {
        character,
        characterClass,
        characterSpec,
      };
    })
    .filter(isNotNull);

const upsertCharacter = (roster: Roster, character: Character): Roster => {
  const nextCharacters = roster.characters.filter(
    (prevCharacter) => prevCharacter.characterName !== character.characterName,
  );
  nextCharacters.push(character);
  return {
    ...roster,
    characters: nextCharacters,
  };
};

const deleteCharacter = (
  roster: Roster,
  characterName: Character[`characterName`],
): Roster => ({
  ...roster,
  groups: roster.groups.map((prevCharacterName) =>
    prevCharacterName === characterName ? null : prevCharacterName,
  ),
  characters: roster.characters.filter(
    (prevCharacter) => prevCharacter.characterName !== characterName,
  ),
});

const createEmptyGroups = (): Groups =>
  new Array(NUM_GROUPS * GROUP_SIZE).fill(null);

const createFakeRoster = (seed: number): Roster => {
  const chance = new Chance(seed);
  const numCharacters = chance.integer({ min: 5, max: 60 });
  const characters: Roster[`characters`] = [];
  const pickCharacterName = (): string => {
    const characterName = chance.first();
    if (
      characters.some((character) => character.characterName === characterName)
    ) {
      return pickCharacterName();
    }
    return characterName;
  };
  for (let k = 0; k < numCharacters; k++) {
    const characterName = pickCharacterName();
    const characterClass = chance.pickone(characterClasses);
    const characterSpec = chance.pickone(characterClass.characterSpecs);
    characters.push({
      characterName,
      characterClassName: characterClass.characterClassName,
      characterSpecName: characterSpec.characterSpecName,
    });
  }
  const groups = createEmptyGroups();
  return characters.reduce<Roster>(
    (roster, character) =>
      changeCharacterIsEnrolled(roster, character.characterName, chance.bool()),
    { characters, groups },
  );
};

const EMPTY_CHARACTER_SPEC_WOWHEAD_ID = `0`;

const getWowheadRaidcompHref = (roster: Roster): string => {
  const characterSpecs = roster.groups
    .map((characterName): string => {
      const character = characterName
        ? findCharacter(roster, characterName)
        : null;
      const characterClass = character
        ? findCharacterClass(character.characterClassName)
        : null;
      const characterSpec =
        character && characterClass
          ? findCharacterSpec(characterClass, character.characterSpecName)
          : null;
      return characterSpec?.wowheadId ?? EMPTY_CHARACTER_SPEC_WOWHEAD_ID;
    })
    .join(``);
  const characterNames = roster.groups
    .map((characterName) => characterName ?? ``)
    .join(`;`);
  const hash = `0${characterSpecs};${characterNames}`;
  return `https://tbc.wowhead.com/raid-composition#${hash}`;
};

const parseWowheadUrl = (roster: Roster, href: string): Roster => {
  if (!href.startsWith(`https://tbc.wowhead.com/raid-composition#0`)) {
    return roster;
  }
  const url = new URL(href);
  const [characterSpecs, ...characterNames] = url.hash
    .slice(`#0`.length)
    .split(`;`);
  const characters = createEmptyGroups().map(
    (_, groupIndex): Character | null => {
      const characterClassSpec = findCharacterClassSpecByWowheadId(
        characterSpecs.charAt(groupIndex),
      );
      if (!characterClassSpec) {
        return null;
      }
      const characterName = characterNames[groupIndex];
      return {
        characterName,
        characterClassName:
          characterClassSpec.characterClass.characterClassName,
        characterSpecName: characterClassSpec.characterSpec.characterSpecName,
      };
    },
  );
  return characters.reduce<Roster>(
    (roster, character, groupIndex) => {
      if (!character) {
        return roster;
      }
      return enrollCharacter(
        disenrollCharacter(
          upsertCharacter(roster, character),
          character.characterName,
        ),
        character.characterName,
        groupIndex,
      );
    },
    { characters: roster.characters, groups: createEmptyGroups() },
  );
};

const isCharacterEnrolled = (
  roster: Roster,
  characterName: Character[`characterName`],
): boolean => roster.groups.includes(characterName);

const enrollCharacter = (
  roster: Roster,
  characterName: Character[`characterName`],
  groupIndex = roster.groups.indexOf(null),
): Roster => {
  if (isCharacterEnrolled(roster, characterName)) {
    return roster;
  }
  return {
    ...roster,
    groups: roster.groups.map((prevCharacterName, prevGroupIndex) =>
      prevGroupIndex === groupIndex ? characterName : prevCharacterName,
    ),
  };
};

const disenrollCharacter = (
  roster: Roster,
  characterName: Character[`characterName`],
): Roster => {
  if (!isCharacterEnrolled(roster, characterName)) {
    return roster;
  }
  return {
    ...roster,
    groups: roster.groups.map((prevCharacterName) =>
      prevCharacterName === characterName ? null : prevCharacterName,
    ),
  };
};

const changeCharacterIsEnrolled = (
  roster: Roster,
  characterName: Character[`characterName`],
  isEnrolled: boolean,
): Roster =>
  isEnrolled
    ? enrollCharacter(roster, characterName)
    : disenrollCharacter(roster, characterName);

const CharacterSpecIcon: FunctionComponent<
  {
    readonly characterSpec: CharacterSpec;
  } & FlexProps
> = ({ characterSpec, ...flexProps }) => (
  <Flex alignItems="center" justifyContent="center" {...flexProps}>
    <img
      src={characterSpec.iconHref}
      alt={characterSpec.characterSpecName}
      style={{ width: `100%`, height: `100%` }}
    />
  </Flex>
);

const CharacterInput: FunctionComponent<{
  readonly character: Character;
  readonly onChangeCharacter: (character: Character) => void;
  readonly onSubmit: () => void;
}> = ({ character, onChangeCharacter, onSubmit }) => {
  const characterClass =
    findCharacterClass(character.characterClassName) ?? characterClasses[0];
  const characterSpec =
    findCharacterSpec(characterClass, character.characterSpecName) ??
    characterClass.characterSpecs[0];
  return (
    <HStack
      w="100%"
      alignItems="center"
      px={2}
      py={1}
      as="form"
      onSubmit={(event) => {
        event.preventDefault();
        if (character.characterName.length > 0) {
          onSubmit();
        }
      }}
      flexWrap="wrap"
    >
      <CharacterSpecIcon
        characterSpec={characterSpec}
        borderColor={characterClass.htmlColor}
        borderWidth={3}
        w={6}
        h={6}
      />
      <Input
        w={40}
        size="sm"
        type="text"
        value={character.characterName}
        placeholder="Character name"
        onChange={({ target: { value: characterName } }) =>
          onChangeCharacter({ ...character, characterName })
        }
        minLength={3}
      />
      <Select
        w={32}
        size="sm"
        value={characterClass.characterClassName}
        onChange={({ target: { value: characterClassName } }) => {
          const nextClass =
            findCharacterClass(characterClassName) ?? characterClasses[0];
          const nextSpec =
            findCharacterSpec(nextClass, character.characterSpecName) ??
            nextClass.characterSpecs[0];
          onChangeCharacter({
            ...character,
            characterClassName: nextClass.characterClassName,
            characterSpecName: nextSpec.characterSpecName,
          });
        }}
      >
        {characterClasses.map(({ characterClassName }) => (
          <option key={characterClassName} value={characterClassName}>
            {characterClassName}
          </option>
        ))}
      </Select>
      <Select
        size="sm"
        w={32}
        value={characterSpec.characterSpecName}
        onChange={({ target: { value: characterSpecName } }) =>
          onChangeCharacter({ ...character, characterSpecName })
        }
      >
        {characterClass.characterSpecs.map(({ characterSpecName }) => (
          <option key={characterSpecName}>{characterSpecName}</option>
        ))}
      </Select>
      <Button size="sm" type="submit">
        Add to roster
      </Button>
    </HStack>
  );
};

const CharacterView: FunctionComponent<
  {
    readonly character: Character;
    readonly characterClass: CharacterClass;
    readonly characterSpec: CharacterSpec;
  } & FlexProps
> = ({ character, characterClass, characterSpec, ...flexProps }) => (
  <Flex
    alignItems="center"
    bgColor={characterClass.htmlColor}
    h={7}
    px={1}
    {...flexProps}
  >
    <CharacterSpecIcon characterSpec={characterSpec} w={5} h={5} />
    <Text isTruncated minW={0} flex={1} pl={1}>
      {character.characterName}
    </Text>
  </Flex>
);

const DEFAULT_NEW_CHARACTER: Character = {
  characterName: ``,
  characterClassName: characterClasses[0].characterClassName,
  characterSpecName: characterClasses[0].characterSpecs[0].characterSpecName,
};

const RosterView: FunctionComponent<{
  readonly roster: Roster;
  readonly onUpsertCharacter: (character: Character) => void;
  readonly onDeleteCharacter: (
    characterName: Character[`characterName`],
  ) => void;
  readonly onChangeCharacterIsEnrolled: (
    character: Character,
    isEnrolled: boolean,
  ) => void;
}> = ({
  roster,
  onUpsertCharacter,
  onDeleteCharacter,
  onChangeCharacterIsEnrolled,
}) => {
  const [newCharacter, setNewCharacter] = useState<Character>(
    DEFAULT_NEW_CHARACTER,
  );
  const totalCount = roster.characters.length;
  const isEnrolledCount = roster.characters.filter((character) =>
    isCharacterEnrolled(roster, character.characterName),
  ).length;
  return (
    <VStack alignItems="flex-start" spacing={4}>
      <Heading as="h2" fontSize="2xl">
        Roster ({isEnrolledCount}/{totalCount})
      </Heading>
      <Flex alignItems="flex-start" pl={6} flexWrap="wrap">
        {Object.values(CharacterSpec.shape.role.Enum).map((role) => {
          const characters = zipCharacters(roster)
            .filter(({ characterSpec }) => characterSpec.role === role)
            .sort((a, b) => sortCharacters(a.character, b.character));
          const totalCount = characters.length;
          const isEnrolledCount = characters.filter(
            ({ character: { characterName } }) =>
              isCharacterEnrolled(roster, characterName),
          ).length;
          return (
            <Flex key={role} flexDirection="column" w={60} mx={2} mt={1}>
              <Heading as="h3" fontSize="lg" mt={2} mb={3}>
                {role} ({isEnrolledCount}/{totalCount})
              </Heading>
              <VStack alignItems="flex-start" fontSize="sm">
                {characters.map(
                  ({ character, characterClass, characterSpec }) => {
                    const isEnrolled = isCharacterEnrolled(
                      roster,
                      character.characterName,
                    );
                    return (
                      <Flex
                        key={character.characterName}
                        w="100%"
                        alignItems="center"
                      >
                        <Checkbox
                          mr={2}
                          isChecked={isEnrolled}
                          onChange={() =>
                            onChangeCharacterIsEnrolled(character, !isEnrolled)
                          }
                        />
                        <CharacterView
                          character={character}
                          characterClass={characterClass}
                          characterSpec={characterSpec}
                          flex={1}
                          minW={0}
                          cursor="pointer"
                          onClick={() =>
                            onChangeCharacterIsEnrolled(character, !isEnrolled)
                          }
                        />
                        <Icon
                          ml={2}
                          w={5}
                          h={5}
                          color="red.500"
                          as={MdDeleteForever}
                          cursor="pointer"
                          onClick={() => {
                            if (
                              confirm(
                                `Really delete ${character.characterName} forever?`,
                              )
                            ) {
                              onDeleteCharacter(character.characterName);
                            }
                          }}
                        />
                      </Flex>
                    );
                  },
                )}
              </VStack>
            </Flex>
          );
        })}
      </Flex>
      <VStack alignItems="flex-start" pl={6}>
        <Heading as="h3" fontSize="lg">
          Add new character
        </Heading>
        <CharacterInput
          character={newCharacter}
          onChangeCharacter={setNewCharacter}
          onSubmit={() => {
            onUpsertCharacter(newCharacter);
            setNewCharacter(DEFAULT_NEW_CHARACTER);
          }}
        />
      </VStack>
    </VStack>
  );
};

const GroupView: FunctionComponent<{
  readonly roster: Roster;
  readonly groupIndex: number;
}> = ({ roster, groupIndex }) => {
  const groupCharacters = roster.groups.slice(
    GROUP_SIZE * groupIndex,
    GROUP_SIZE * (groupIndex + 1),
  );
  return (
    <VStack w={40} alignItems="stretch" mx={2} mt={1}>
      <Heading as="h3" fontSize="lg">{`Group ${groupIndex + 1}`}</Heading>
      {groupCharacters.map((characterName, key) => {
        const character = characterName
          ? findCharacter(roster, characterName)
          : null;
        const characterClass = character
          ? findCharacterClass(character.characterClassName)
          : null;
        const characterSpec =
          character && characterClass
            ? findCharacterSpec(characterClass, character.characterSpecName)
            : null;
        if (!character || !characterClass || !characterSpec) {
          return (
            <Flex key={key} h={7}>
              <Text
                fontStyle="italic"
                textAlign="center"
                w="100%"
                textColor="blackAlpha.600"
              >
                (Empty)
              </Text>
            </Flex>
          );
        }
        return (
          <CharacterView
            key={key}
            character={character}
            characterClass={characterClass}
            characterSpec={characterSpec}
            h={7}
          />
        );
      })}
    </VStack>
  );
};

const GroupsView: FunctionComponent<{
  readonly roster: Roster;
  readonly onUpdateRoster: (next: (roster: Roster) => Roster) => void;
}> = ({ roster, onUpdateRoster }) => {
  const wowheadUrl = useMemo(() => getWowheadRaidcompHref(roster), [roster]);

  const ertString = useMemo(
    () => createErtRaidgroupsImportString(roster.groups),
    [roster.groups],
  );

  const lastCharacterIndex = roster.groups
    .map((characterName) => (characterName ? true : false))
    .lastIndexOf(true);

  const lastNonEmptyGroupIndex = Math.ceil(
    (lastCharacterIndex + 1) / GROUP_SIZE,
  );
  const numDisplayedGroups = Math.max(5, lastNonEmptyGroupIndex);

  return (
    <VStack w="100%" alignItems="flex-start" spacing={4}>
      <Heading as="h2" fontSize="2xl">
        Groups
      </Heading>
      <Flex alignItems="flex-start" pl={6} flexWrap="wrap">
        {new Array(numDisplayedGroups).fill(null).map((_, groupIndex) => (
          <GroupView key={groupIndex} roster={roster} groupIndex={groupIndex} />
        ))}
      </Flex>
      <VStack alignItems="flex-start" pl={6}>
        {Object.values(CharacterSpec.shape.role.Enum).map((role) => {
          const characters = zipCharacters(roster)
            .filter(({ characterSpec }) => characterSpec.role === role)
            .sort((a, b) => sortCharacters(a.character, b.character));
          const isEnrolledCount = characters.filter(
            ({ character: { characterName } }) =>
              isCharacterEnrolled(roster, characterName),
          ).length;
          return (
            <HStack key={role}>
              <Heading as="h3" fontSize="md" w={20}>
                {role}:
              </Heading>
              <Text>{isEnrolledCount}</Text>
            </HStack>
          );
        })}
        <HStack>
          <Heading as="h3" fontSize="md" w={20}>
            Total:
          </Heading>
          <Text>
            {
              roster.characters.filter(({ characterName }) =>
                isCharacterEnrolled(roster, characterName),
              ).length
            }
          </Text>
        </HStack>
      </VStack>
      <HStack pl={6}>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() => {
            if (confirm(`Do you really want to clear all groups?`)) {
              onUpdateRoster((roster) => ({
                ...roster,
                groups: createEmptyGroups(),
              }));
            }
          }}
        >
          Clear groups
        </Button>
      </HStack>
      <VStack alignItems="flex-start" pl={6}>
        <Heading as="h3" fontSize="md">
          Import from / export to Wowhead
        </Heading>
        <HStack justifyContent="flex-start" alignItems="center">
          <Input
            size="sm"
            w={96}
            type="text"
            value={wowheadUrl}
            onChange={({ target: { value: wowheadUrl } }) =>
              onUpdateRoster(() => parseWowheadUrl(roster, wowheadUrl))
            }
          />
          <Flex
            as="a"
            href={wowheadUrl}
            target="_blank"
            rel="noopener noreferer noreferrer"
          >
            <Icon w={5} h={5} as={MdOpenInNew} />
          </Flex>
        </HStack>
      </VStack>
      <VStack alignItems="flex-start" pl={6}>
        <Heading as="h3" fontSize="md">
          ERT Export
        </Heading>
        <Textarea
          size="sm"
          fontFamily="monospace"
          w={96}
          h={64}
          value={ertString}
          onChange={() => null}
          resize="none"
        />
      </VStack>
    </VStack>
  );
};

const DEFAULT_ROSTER: Roster = {
  characters: [],
  groups: createEmptyGroups(),
};

const TbcRaidcomp: FunctionComponent<{
  readonly roster: Roster;
  readonly setRoster: (next: (roster: Roster) => Roster) => void;
}> = ({ roster, setRoster }) => {
  const onClickDownload = useCallback(() => {
    const link = document.createElement(`a`);
    link.download = `tbc-raidcomp.json`;
    link.href = `data:application/json,${JSON.stringify(roster, null, 2)}`;
    link.setAttribute(`style`, `display: none;`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [roster]);

  return (
    <VStack alignItems="flex-start" w="100%">
      <GroupsView roster={roster} onUpdateRoster={setRoster} />
      <RosterView
        roster={roster}
        onUpsertCharacter={(character) =>
          setRoster((roster) => upsertCharacter(roster, character))
        }
        onDeleteCharacter={(characterName) =>
          setRoster((roster) => deleteCharacter(roster, characterName))
        }
        onChangeCharacterIsEnrolled={(character, isEnrolled) =>
          setRoster((roster) =>
            changeCharacterIsEnrolled(
              roster,
              character.characterName,
              isEnrolled,
            ),
          )
        }
      />
      <HStack>
        <Button size="sm" onClick={onClickDownload}>
          Download as JSON
        </Button>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() => {
            if (
              confirm(
                `Do you really want to generate fake data? This will overwrite your current roster.`,
              )
            ) {
              setRoster(() => createFakeRoster(Date.now()));
            }
          }}
        >
          Generate fake data
        </Button>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() => {
            if (
              confirm(
                `Do you really want to delete all data? This will overwrite your current roster.`,
              )
            ) {
              setRoster(() => DEFAULT_ROSTER);
            }
          }}
        >
          Clear all data
        </Button>
      </HStack>
    </VStack>
  );
};

const TbcRaidcompPage: FunctionComponent = () => {
  const [localRoster, setLocalRoster] = useState<null | Roster>(null);

  const hashJsonUrl = useLocationHash();

  const hashRoster = useAsync(async () => {
    if (!hashJsonUrl) {
      return DEFAULT_ROSTER;
    }
    return await jsonUrlCodec
      .decompress(hashJsonUrl)
      .then(Roster.parse)
      .catch(() => DEFAULT_ROSTER);
  }, [hashJsonUrl]);

  useEffect(() => {
    setLocalRoster((localRoster) =>
      AsyncResult.match(hashRoster, {
        pending: () => localRoster,
        rejected: () => DEFAULT_ROSTER,
        resolved: (hashRoster) =>
          deepEqual(localRoster, hashRoster) ? localRoster : hashRoster,
      }),
    );
  }, [hashRoster]);

  const localJsonUrl = useAsync(
    async () => (localRoster ? await jsonUrlCodec.compress(localRoster) : null),
    [localRoster],
  );

  useEffect(() => {
    AsyncResult.match(localJsonUrl, {
      pending: () => null,
      rejected: () => null,
      resolved: (localJsonUrl) => {
        if (localJsonUrl && localJsonUrl !== hashJsonUrl) {
          const nextUrl = new URL(window.location.href);
          nextUrl.hash = localJsonUrl;
          history.pushState(null, pageTitle, nextUrl.href);
        }
      },
    });
  }, [localJsonUrl]);

  return (
    <Fragment>
      <Head>
        <script src="/vendor/fengari-web.js" />
      </Head>
      <Container p={4} maxW="container.xl">
        <Heading as="h1" mb={6} textAlign="center">
          {pageTitle}
        </Heading>
        {localRoster ? (
          <TbcRaidcomp
            roster={localRoster}
            setRoster={(next) =>
              setLocalRoster((localRoster) =>
                localRoster ? next(localRoster) : localRoster,
              )
            }
          />
        ) : (
          <Spinner />
        )}
      </Container>
    </Fragment>
  );
};

// Use default export to play nicely with next/dynamic
export default TbcRaidcompPage;
