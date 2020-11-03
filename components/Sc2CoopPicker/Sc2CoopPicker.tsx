import { Box, Button, Container, Heading } from "@chakra-ui/core";
import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  FormEvent,
} from "react";

enum Commander {
  Raynor = "Raynor",
  Kerrigan = "Kerrigan",
  Artanis = "Artanis",
  Swann = "Swann",
  Zagara = "Zagara",
  Vorazun = "Vorazun",
  Karax = "Karax",
  Abathur = "Abathur",
  Alarak = "Alarak",
  Nova = "Nova",
  Stukov = "Stukov",
  Fenix = "Fenix",
  Dehaka = "Dehaka",
  HanAndHorner = "Han & Horner",
  Tychus = "Tychus",
  Zeratul = "Zeratul",
  Stetmann = "Stetmann",
  Mengsk = "Mengsk",
}

const COMMANDERS = Object.values(Commander) as Commander[];

const COMMANDER_PORTAITS: Record<Commander, string> = {
  [Commander.Raynor]:
    "https://vignette.wikia.nocookie.net/starcraft/images/c/cb/RaynorCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161016",
  [Commander.Kerrigan]:
    "https://vignette.wikia.nocookie.net/starcraft/images/8/88/KerriganCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161250",
  [Commander.Artanis]:
    "https://vignette.wikia.nocookie.net/starcraft/images/d/d5/ArtanisCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161327",
  [Commander.Swann]:
    "https://vignette.wikia.nocookie.net/starcraft/images/8/8c/SwannCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161402",
  [Commander.Zagara]:
    "https://vignette.wikia.nocookie.net/starcraft/images/f/f4/ZagaraCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161432",
  [Commander.Vorazun]:
    "https://vignette.wikia.nocookie.net/starcraft/images/4/41/VorazunCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161512",
  [Commander.Karax]:
    "https://vignette.wikia.nocookie.net/starcraft/images/7/7f/KaraxCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161542",
  [Commander.Abathur]:
    "https://vignette.wikia.nocookie.net/starcraft/images/2/2c/AbathurCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161619",
  [Commander.Alarak]:
    "https://vignette.wikia.nocookie.net/starcraft/images/2/28/AlarakCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161648",
  [Commander.Nova]:
    "https://vignette.wikia.nocookie.net/starcraft/images/3/3a/NovaCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161721",
  [Commander.Stukov]:
    "https://vignette.wikia.nocookie.net/starcraft/images/b/b3/StukovCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161758",
  [Commander.Fenix]:
    "https://vignette.wikia.nocookie.net/starcraft/images/1/16/FenixCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161831",
  [Commander.Dehaka]:
    "https://vignette.wikia.nocookie.net/starcraft/images/b/b0/DehakaCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161901",
  [Commander.HanAndHorner]:
    "https://vignette.wikia.nocookie.net/starcraft/images/f/ff/Han%26HornerCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110161953",
  [Commander.Tychus]:
    "https://vignette.wikia.nocookie.net/starcraft/images/e/e8/TychusCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110162031",
  [Commander.Zeratul]:
    "https://vignette.wikia.nocookie.net/starcraft/images/5/5d/ZeratulCommanderIcon.jpeg/revision/latest/scale-to-width-down/76?cb=20191110162058",
  [Commander.Stetmann]:
    "https://vignette.wikia.nocookie.net/starcraft/images/1/1c/StetmannCommanderIcon.jpeg/revision/latest/scale-to-width-down/76?cb=20191110162129",
  [Commander.Mengsk]:
    "https://vignette.wikia.nocookie.net/starcraft/images/9/99/MengskCommanderIcon.png/revision/latest/scale-to-width-down/76?cb=20191110162159",
};

enum Variant {
  Vanilla = "Vanilla",
  Prestige1 = "Prestige 1",
  Prestige2 = "Prestige 2",
  Prestige3 = "Prestige 3",
}

const VARIANTS = Object.values(Variant) as Variant[];

type Sc2CoopPickerResult = {
  readonly commander: Commander;
  readonly variant: Variant;
};

type Sc2CoopPickerState = {
  readonly commander: Commander;
  readonly variant: Variant;
  readonly available: boolean;
}[];

const isAvailable = (
  state: Sc2CoopPickerState,
  commander: Commander,
  variant: Variant,
): boolean =>
  state.some(
    (item) =>
      item.commander === commander &&
      item.variant === variant &&
      item.available,
  );

const toggleAvailable = (
  state: Sc2CoopPickerState,
  commander: null | Commander,
  variant: null | Variant,
): Sc2CoopPickerState =>
  state.map((item) => {
    if (
      (commander === null || item.commander === commander) &&
      (variant === null || item.variant === variant)
    ) {
      return {
        ...item,
        available: !item.available,
      };
    }
    return item;
  });

const setAvailable = (
  state: Sc2CoopPickerState,
  commander: null | Commander,
  variant: null | Variant,
  available: boolean,
): Sc2CoopPickerState =>
  state.map((item) => {
    if (
      (commander === null || item.commander === commander) &&
      (variant === null || item.variant === variant)
    ) {
      return {
        ...item,
        available,
      };
    }
    return item;
  });

const DEFAULT_STATE: Sc2CoopPickerState = COMMANDERS.flatMap((commander) =>
  VARIANTS.map((variant) => ({ commander, variant, available: true })),
);

const CURRENT_VERSION = "0.0.0";

const parseSerializedState = (input: string): Sc2CoopPickerState | null => {
  try {
    const obj = JSON.parse(input);
    if (typeof obj !== "object" || obj === null) {
      return null;
    }
    if (obj.version !== CURRENT_VERSION) {
      return null;
    }
    if (!Array.isArray(obj.state)) {
      return null;
    }
    for (const item of obj.state) {
      if (typeof item !== "object" || item === null) {
        return null;
      }
      if (!COMMANDERS.includes(item.commander)) {
        return null;
      }
      if (!VARIANTS.includes(item.variant)) {
        return null;
      }
      if (typeof item.available !== "boolean") {
        return null;
      }
    }
    return obj.state;
  } catch {
    return null;
  }
};

const STORAGE_KEY = "Sc2CoopPickerState";

const getDefaultState = (): Sc2CoopPickerState => {
  const serializedState = window.localStorage.getItem(STORAGE_KEY);
  if (!serializedState) {
    return DEFAULT_STATE;
  }
  return parseSerializedState(serializedState) ?? DEFAULT_STATE;
};

export const Sc2CoopPickerPage: FunctionComponent = () => {
  const [state, setState] = useState<Sc2CoopPickerState>(DEFAULT_STATE);

  useEffect(() => {
    setState(getDefaultState());
  }, []);

  const [result, setResult] = useState<null | Sc2CoopPickerResult>(null);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: CURRENT_VERSION,
        state,
      }),
    );
  }, [state]);

  useEffect(() => {
    setResult(null);
  }, [state]);

  const pickRandom = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const available = state.filter((item) => item.available);
      if (available.length === 0) {
        return;
      }
      const key = Math.floor(Math.random() * available.length);
      const item = available[key];
      setResult({
        commander: item.commander,
        variant: item.variant,
      });
    },
    [state],
  );

  return (
    <Container p={4} maxWidth="80ch">
      <Heading as="h1" mb={6} textAlign="center">
        SC2 Co-op Picker
      </Heading>
      <table width="100%">
        <thead>
          <tr>
            <td />
            {VARIANTS.map((variant, key) => (
              <th
                key={key}
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setState((state) => toggleAvailable(state, null, variant))
                }
                align="center"
              >
                {variant}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMMANDERS.map((commander, key) => (
            <tr key={key}>
              <th
                scope="row"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setState((state) => toggleAvailable(state, commander, null))
                }
                align="center"
              >
                <img
                  src={COMMANDER_PORTAITS[commander]}
                  alt={commander}
                  width="48px"
                  height="48px"
                />
              </th>
              {VARIANTS.map((variant, key) => (
                <td key={key} align="center">
                  <input
                    type="checkbox"
                    style={{ cursor: "pointer" }}
                    checked={isAvailable(state, commander, variant)}
                    onChange={() =>
                      setState((state) =>
                        toggleAvailable(state, commander, variant),
                      )
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Box my={2}>
        <Button
          mx={2}
          color="default"
          onClick={() =>
            setState((state) => setAvailable(state, null, null, true))
          }
        >
          Check all
        </Button>
        <Button
          color="default"
          onClick={() =>
            setState((state) => setAvailable(state, null, null, false))
          }
        >
          Uncheck all
        </Button>
      </Box>
      <Box my={2}>
        <Button mx={2} onClick={pickRandom}>
          {"I'm feeling lucky"}
        </Button>
        {result && (
          <Box ml={12}>
            <Box>You shall play:</Box>
            <Box>
              <img src={COMMANDER_PORTAITS[result.commander]} />
            </Box>
            <Box>{result.variant}</Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};
