import { Button } from "@chakra-ui/button";
import { Chance } from "chance";
import { MdDeleteForever, MdOpenInNew } from "react-icons/md";
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
import { Alert } from "@chakra-ui/alert";
import { Checkbox, Heading, Icon, Textarea } from "@chakra-ui/react";

import { useAsync } from "../../lib/useAsync";
import { isNotNull } from "../../lib/types";

import ertLua from "./ert.lua";

declare const fengari: {
  readonly load: (source: string) => () => unknown;
};

const createErtRaidgroupsImportString = (groups: Groups): string => {
  const input = `[[ ${groups
    .map((group) =>
      group.map((characterName) => characterName ?? `dummy`).join(` `),
    )
    .join(`\n`)} ]]`;
  const src = ertLua.replace(`"$$__INPUT__$$"`, input);
  return fengari.load(src)() as string;
};

const jsonUrlCodec = createJsonUrlCodec(`lzw`);

const Spec = z.object({
  specName: z.string(),
  role: z.enum([`Tank`, `Heal`, `Ranged`, `Melee`]),
  iconHref: z.string(),
  wowheadId: z.string().length(1),
});

type Spec = z.infer<typeof Spec>;

const Class = z.object({
  className: z.string(),
  htmlColor: z.string(),
  specs: z.array(Spec).length(3),
});

type Class = z.infer<typeof Class>;

const classes: Class[] = [
  {
    className: `Druid`,
    htmlColor: `#FF7C0A`,
    specs: [
      {
        specName: `Balance`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_nature_starfall.jpg`,
        wowheadId: `x`,
      },
      {
        specName: `Feral`,
        role: `Tank`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_racial_bearform.jpg`,
        wowheadId: `v`,
      },
      {
        specName: `Restoration`,
        role: `Heal`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_nature_healingtouch.jpg`,
        wowheadId: `w`,
      },
    ],
  },
  {
    className: `Hunter`,
    htmlColor: `#AAD372`,
    specs: [
      {
        specName: `Beast Mastery`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_beasttaming.jpg`,
        wowheadId: `C`,
      },
      {
        specName: `Marksmanship`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_marksmanship.jpg`,
        wowheadId: `F`,
      },
      {
        specName: `Survival`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_swiftstrike.jpg`,
        wowheadId: `D`,
      },
    ],
  },
  {
    className: `Mage`,
    htmlColor: `#3FC7EB`,
    specs: [
      {
        specName: `Arcane`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_magicalsentry.jpg`,
        wowheadId: `d`,
      },
      {
        specName: `Fire`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_fire_firebolt02.jpg`,
        wowheadId: `b`,
      },
      {
        specName: `Ice`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_frost_frostbolt02.jpg`,
        wowheadId: `c`,
      },
    ],
  },
  {
    className: `Paladin`,
    htmlColor: `#F48CBA`,
    specs: [
      {
        specName: `Holy`,
        role: `Heal`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_holybolt.jpg`,
        wowheadId: `H`,
      },
      {
        specName: `Protection`,
        role: `Tank`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_devotionaura.jpg`,
        wowheadId: `J`,
      },
      {
        specName: `Retribution`,
        role: `Heal`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_auraoflight.jpg`,
        wowheadId: `G`,
      },
    ],
  },
  {
    className: `Priest`,
    htmlColor: `#eee`,
    specs: [
      {
        specName: `Discipline`,
        role: `Heal`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_wordfortitude.jpg`,
        wowheadId: `n`,
      },
      {
        specName: `Holy`,
        role: `Heal`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_holy_holybolt.jpg`,
        wowheadId: `n`,
      },
      {
        specName: `Shadow`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_shadowwordpain.jpg`,
        wowheadId: `n`,
      },
    ],
  },
  {
    className: `Rogue`,
    htmlColor: `#FFF468`,
    specs: [
      {
        specName: `Assassination`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_rogue_eviscerate.jpg`,
        wowheadId: `k`,
      },
      {
        specName: `Combat`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_backstab.jpg`,
        wowheadId: `j`,
      },
      {
        specName: `Subtelty`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_rogue_eviscerate.jpg`,
        wowheadId: `m`,
      },
    ],
  },
  {
    className: `Shaman`,
    htmlColor: `#0070DD`,
    specs: [
      {
        specName: `Elemental`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_nature_lightning.jpg`,
        wowheadId: `r`,
      },
      {
        specName: `Enhancement`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_nature_lightningshield.jpg`,
        wowheadId: `t`,
      },
      {
        specName: `Restoration`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_nature_magicimmunity.jpg`,
        wowheadId: `s`,
      },
    ],
  },
  {
    className: `Warlock`,
    htmlColor: `#8788EE`,
    specs: [
      {
        specName: `Affliction`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_deathcoil.jpg`,
        wowheadId: `z`,
      },
      {
        specName: `Demonology`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_metamorphosis.jpg`,
        wowheadId: `B`,
      },
      {
        specName: `Destruction`,
        role: `Ranged`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_rainoffire.jpg`,
        wowheadId: `y`,
      },
    ],
  },
  {
    className: `Warrior`,
    htmlColor: `#C69B6D`,
    specs: [
      {
        specName: `Arms`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_rogue_eviscerate.jpg`,
        wowheadId: `f`,
      },
      {
        specName: `Fury`,
        role: `Melee`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/ability_warrior_innerrage.jpg`,
        wowheadId: `h`,
      },
      {
        specName: `Protection`,
        role: `Tank`,
        iconHref: `https://wow.zamimg.com/images/wow/icons/medium/inv_shield_06.jpg`,
        wowheadId: `g`,
      },
    ],
  },
];

const CharacterName = z.string();

const Character = z
  .object({
    characterName: CharacterName,
    className: z.string(),
    specName: z.string(),
  })
  .refine((player) =>
    classes.find(
      ({ className, specs }) =>
        className === player.className &&
        specs.some(({ specName }) => specName === player.specName),
    ),
  );

type Character = z.infer<typeof Character>;
const Group = z.array(z.union([z.null(), CharacterName])).length(5);
type Group = z.infer<typeof Group>;
const Groups = z.array(Group).min(2);
type Groups = z.infer<typeof Groups>;

const Roster = z.object({
  characters: z.array(Character),
  groups: Groups,
});

type Roster = z.infer<typeof Roster>;

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
    const characterClass = chance.pickone(classes);
    const characterSpec = chance.pickone(characterClass.specs);
    characters.push({
      characterName,
      className: characterClass.className,
      specName: characterSpec.specName,
    });
  }
  const groups: Roster[`groups`] = [
    padGroup([]),
    padGroup([]),
    padGroup([]),
    padGroup([]),
    padGroup([]),
  ];
  return characters.reduce<Roster>(
    (roster, character) =>
      changeCharacterIsEnrolled(roster, character.characterName, chance.bool()),
    { characters, groups },
  );
};

const findClass = (className: Class[`className`]): Class | null =>
  classes.find((c) => c.className === className) ?? null;

const findSpec = (
  { specs }: Class,
  specName: Spec[`specName`],
): Class[`specs`][number] | null =>
  specs.find((spec) => spec.specName === specName) ?? null;

const sortCharacters = (a: Character, b: Character): number =>
  a.className !== b.className
    ? a.className.localeCompare(b.className)
    : a.specName !== b.specName
    ? a.specName.localeCompare(b.specName)
    : a.characterName.localeCompare(b.characterName);

const findCharacter = (
  roster: Roster,
  characterName: Character[`characterName`],
): Character | null =>
  roster.characters.find(
    (character) => character.characterName === characterName,
  ) ?? null;

const zipCharacterClass = (
  roster: Roster,
): {
  readonly character: Character;
  readonly characterClass: Class;
  readonly characterSpec: Spec;
}[] =>
  roster.characters
    .map((character) => {
      const characterClass = findClass(character.className);
      if (!characterClass) {
        return null;
      }
      const characterSpec = findSpec(characterClass, character.specName);
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

const padGroup = (group: Group): Group => {
  if (group.length === 5) {
    return group;
  }
  if (group.length > 5) {
    return group.slice(0, 5);
  }
  const nextGroup = [...group];
  while (nextGroup.length < 5) {
    nextGroup.push(null);
  }
  return nextGroup;
};

type WowheadPart = {
  readonly classSpecId: Class[`specs`][number][`wowheadId`];
  readonly characterName: Character[`characterName`];
};

const EMPTY_WOWHEAD_PART: WowheadPart = {
  classSpecId: `0`,
  characterName: ``,
};

const getWowheadRaidcompHref = (roster: Roster): string => {
  const aggreg = roster.groups.map(padGroup).flatMap((group) =>
    group.map((characterName): WowheadPart => {
      if (!characterName) {
        return EMPTY_WOWHEAD_PART;
      }
      const character = findCharacter(roster, characterName);
      if (!character) {
        return EMPTY_WOWHEAD_PART;
      }
      const characterClass = findClass(character.className);
      if (!characterClass) {
        return EMPTY_WOWHEAD_PART;
      }
      const classSpec = findSpec(characterClass, character.specName);
      if (!classSpec) {
        return EMPTY_WOWHEAD_PART;
      }
      return {
        classSpecId: classSpec.wowheadId,
        characterName,
      };
    }),
  );
  const classSpecAggreg = aggreg.map(({ classSpecId }) => classSpecId).join(``);
  const characterNameAggreg = aggreg
    .map(({ characterName }) => encodeURIComponent(characterName))
    .join(`;`);
  const hash = `0${classSpecAggreg};${characterNameAggreg}`;
  return `https://tbc.wowhead.com/raid-composition#${hash}`;
};

const cloneGroup = (group: Group): Group => [...group];
const cloneGroups = (groups: Groups): Groups => groups.map(cloneGroup);

const deduplicate = (groups: Groups, characterName: string): Groups => {
  const nextGroups = cloneGroups(groups);
  let prevOccurence: null | [groupIndex: number, characterIndex: number] = null;
  for (let groupIndex = 0; groupIndex < nextGroups.length; groupIndex++) {
    const group = nextGroups[groupIndex];
    for (
      let characterIndex = 0;
      characterIndex < group.length;
      characterIndex++
    ) {
      if (group[characterIndex] === characterName) {
        if (prevOccurence) {
          nextGroups[prevOccurence[0]][prevOccurence[1]] = null;
        }
        prevOccurence = [groupIndex, characterIndex];
      }
    }
  }
  return nextGroups;
};

const parseWowheadUrl = (roster: Roster, href: string): Roster => {
  const url = new URL(href);
  if (url.pathname !== `/raid-composition`) {
    return roster;
  }
  const hash = url.hash.slice(1);
  const [, ...characterNames] = hash.split(`;`);
  const groups: Groups = [];
  let currentGroup = -1;
  for (let k = 0; k < characterNames.length; k++) {
    if (k % 5 === 0) {
      groups.push([]);
      currentGroup++;
    }
    groups[currentGroup].push(
      findCharacter(roster, characterNames[k])?.characterName ?? null,
    );
  }
  return {
    ...roster,
    groups: characterNames.reduce<Groups>(
      (groups, characterName) => deduplicate(groups, characterName),
      groups.map(padGroup),
    ),
  };
};

const updateCharacter = (
  roster: Roster,
  prevCharacter: null | Character,
  nextCharacter: null | Character,
): Roster => {
  if (nextCharacter === null) {
    return {
      ...roster,
      characters: roster.characters.filter(
        (character) => character.characterName !== prevCharacter?.characterName,
      ),
      groups: roster.groups.map((group) =>
        group.map((characterName) =>
          characterName === prevCharacter?.characterName ? null : characterName,
        ),
      ),
    };
  }
  if (prevCharacter === null) {
    return {
      ...roster,
      characters: [...roster.characters, nextCharacter],
    };
  }
  return {
    ...roster,
    characters: roster.characters.map((character) =>
      character.characterName === prevCharacter.characterName
        ? nextCharacter
        : character,
    ),
    groups: roster.groups.map((group) =>
      group.map((characterName) =>
        characterName === prevCharacter.characterName
          ? nextCharacter.characterName
          : characterName,
      ),
    ),
  };
};

const isCharacterEnrolled = (
  roster: Roster,
  characterName: Character[`characterName`],
): boolean => roster.groups.some((group) => group.includes(characterName));

const enrollCharacter = (
  roster: Roster,
  characterName: Character[`characterName`],
): Roster => {
  if (isCharacterEnrolled(roster, characterName)) {
    return roster;
  }
  const nextGroups = roster.groups.map((group) => [...group]);
  for (const group of nextGroups) {
    for (let k = 0; k < 5; k++) {
      if (group[k] === null) {
        group[k] = characterName;
        return {
          ...roster,
          groups: nextGroups,
        };
      }
    }
  }
  nextGroups.push([characterName, null, null, null, null]);
  return {
    ...roster,
    groups: nextGroups,
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
    groups: roster.groups.map((group) =>
      group.map((prevCharacterName) =>
        prevCharacterName === characterName ? null : prevCharacterName,
      ),
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

const SpecIcon: FunctionComponent<
  {
    readonly spec: Spec;
  } & FlexProps
> = ({ spec, ...flexProps }) => (
  <Flex alignItems="center" justifyContent="center" {...flexProps}>
    <img
      src={spec.iconHref}
      alt={spec.specName}
      style={{ width: `100%`, height: `100%` }}
    />
  </Flex>
);

const CharacterInput: FunctionComponent<{
  readonly character: Character;
  readonly onChangeCharacter: (character: Character) => void;
  readonly onSubmit: () => void;
}> = ({ character, onChangeCharacter, onSubmit }) => {
  const characterClass = findClass(character.className) ?? classes[0];
  const characterSpec =
    findSpec(characterClass, character.specName) ?? characterClass.specs[0];
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
      <SpecIcon
        spec={characterSpec}
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
        value={characterClass.className}
        onChange={({ target: { value: className } }) => {
          const nextClass = findClass(className) ?? classes[0];
          const nextSpec =
            findSpec(nextClass, character.specName) ?? nextClass.specs[0];
          onChangeCharacter({
            ...character,
            className: nextClass.className,
            specName: nextSpec.specName,
          });
        }}
      >
        {classes.map(({ className }) => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </Select>
      <Select
        size="sm"
        w={32}
        value={characterSpec.specName}
        onChange={({ target: { value: specName } }) =>
          onChangeCharacter({ ...character, specName })
        }
      >
        {characterClass.specs.map(({ specName }) => (
          <option key={specName}>{specName}</option>
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
    readonly characterClass: Class;
    readonly characterSpec: Spec;
  } & FlexProps
> = ({ character, characterClass, characterSpec, ...flexProps }) => (
  <Flex
    alignItems="center"
    bgColor={characterClass.htmlColor}
    h={7}
    px={1}
    {...flexProps}
  >
    <SpecIcon spec={characterSpec} w={5} h={5} />
    <Text isTruncated minW={0} flex={1} ml={1}>
      {character.characterName}
    </Text>
  </Flex>
);

const DEFAULT_NEW_CHARACTER: Character = {
  characterName: ``,
  className: classes[0].className,
  specName: classes[0].specs[0].specName,
};

const RosterView: FunctionComponent<{
  readonly roster: Roster;
  readonly onAddCharacter: (character: Character) => void;
  readonly onDeleteCharacter: (character: Character) => void;
  readonly onChangeCharacterIsEnrolled: (
    character: Character,
    isEnrolled: boolean,
  ) => void;
}> = ({
  roster,
  onAddCharacter,
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
      <HStack alignItems="flex-start" pl={6} flexWrap="wrap">
        {Object.values(Spec.shape.role.Enum).map((role) => {
          const characters = zipCharacterClass(roster)
            .filter(({ characterSpec }) => characterSpec.role === role)
            .sort((a, b) => sortCharacters(a.character, b.character));
          const totalCount = characters.length;
          const isEnrolledCount = characters.filter(
            ({ character: { characterName } }) =>
              isCharacterEnrolled(roster, characterName),
          ).length;
          return (
            <Flex key={role} flexDirection="column" w={60}>
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
                              onDeleteCharacter(character);
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
      </HStack>
      <VStack alignItems="flex-start" pl={6}>
        <Heading as="h3" fontSize="lg">
          Add new character
        </Heading>
        <CharacterInput
          character={newCharacter}
          onChangeCharacter={setNewCharacter}
          onSubmit={() => {
            onAddCharacter(newCharacter);
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
  const group = roster.groups[groupIndex];
  if (!group) {
    return null;
  }
  return (
    <VStack w={40} alignItems="stretch">
      <Heading as="h3" fontSize="lg">{`Group ${groupIndex + 1}`}</Heading>
      {group.map((characterName, key) => {
        const character = characterName
          ? findCharacter(roster, characterName)
          : null;
        const characterClass = character
          ? findClass(character.className)
          : null;
        const characterSpec =
          character && characterClass
            ? findSpec(characterClass, character.specName)
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
  readonly onUpdateRoster: (roster: Roster) => void;
}> = ({ roster, onUpdateRoster }) => {
  const wowheadUrl = useMemo(() => getWowheadRaidcompHref(roster), [roster]);
  const ertString = useMemo(
    () => createErtRaidgroupsImportString(roster.groups),
    [roster.groups],
  );
  return (
    <VStack w="100%" alignItems="flex-start" spacing={4}>
      <Heading as="h2" fontSize="2xl">
        Groups
      </Heading>
      <HStack alignItems="flex-start" pl={6} flexWrap="wrap">
        {roster.groups.map((_group, groupIndex) => (
          <GroupView key={groupIndex} roster={roster} groupIndex={groupIndex} />
        ))}
      </HStack>
      <VStack alignItems="flex-start" pl={6}>
        {Object.values(Spec.shape.role.Enum).map((role) => {
          const characters = zipCharacterClass(roster)
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
              onUpdateRoster(parseWowheadUrl(roster, wowheadUrl))
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
          resize="none"
        />
      </VStack>
    </VStack>
  );
};

const EMPTY_GROUP = (): Group => [null, null, null, null, null];

const DEFAULT_ROSTER: Roster = {
  characters: [],
  groups: [
    EMPTY_GROUP(),
    EMPTY_GROUP(),
    EMPTY_GROUP(),
    EMPTY_GROUP(),
    EMPTY_GROUP(),
  ],
};

const TbcRaidcompPage: FunctionComponent = () => {
  const [roster, setRoster] = useState<Roster>(DEFAULT_ROSTER);

  const initialJsonUrl = useAsync(async () => {
    if (window.location.hash) {
      return jsonUrlCodec.decompress(window.location.hash).then(Roster.parse);
    }
    return null;
  }, []);

  useEffect(() => {
    AsyncResult.match(initialJsonUrl, {
      pending: () => null,
      rejected: () => null,
      resolved: (roster) => (roster ? setRoster(roster) : null),
    });
  }, [initialJsonUrl]);

  const jsonUrl = useAsync(() => jsonUrlCodec.compress(roster), [roster]);

  useEffect(() => {
    AsyncResult.match(jsonUrl, {
      pending: () => null,
      rejected: () => null,
      resolved: (jsonUrl) => {
        window.location.hash = jsonUrl;
      },
    });
  }, [jsonUrl]);

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
    <Fragment>
      <Head>
        <script src="/vendor/fengari-web.js" />
      </Head>
      <Container p={4} maxW="container.xl">
        <Heading as="h1" mb={6} textAlign="center">
          TBC Raidcomp
        </Heading>
        {AsyncResult.is.pending(initialJsonUrl) ? (
          <Spinner />
        ) : (
          <Fragment>
            {AsyncResult.is.rejected(initialJsonUrl) && (
              <Alert>
                {JSON.stringify(AsyncResult.to.rejectedError(initialJsonUrl))}
              </Alert>
            )}
            <VStack alignItems="flex-start" w="100%">
              <RosterView
                roster={roster}
                onAddCharacter={(character) =>
                  setRoster((roster) =>
                    updateCharacter(roster, null, character),
                  )
                }
                onDeleteCharacter={(characterName) =>
                  setRoster((roster) =>
                    updateCharacter(roster, characterName, null),
                  )
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
              <GroupsView roster={roster} onUpdateRoster={setRoster} />
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
                      setRoster(createFakeRoster(Date.now()));
                    }
                  }}
                >
                  Generate fake data
                </Button>
              </HStack>
            </VStack>
          </Fragment>
        )}
      </Container>
    </Fragment>
  );
};

// Use default export to play nicely with next/dynamic
export default TbcRaidcompPage;
