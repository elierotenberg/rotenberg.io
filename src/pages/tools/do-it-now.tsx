import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import type { DependencyList, FunctionComponent } from "react";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { MdPause, MdPlayArrow, MdStop } from "react-icons/md";
import { range } from "typed-utilities";
import { v4 as createUuidV4 } from "uuid";
import { z } from "zod";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// https://stackoverflow.com/a/51870158
const youtubeUrlRegEx =
  /^(https:\/\/)?(((m|www)\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)$/i;

const getYoutubeVideoId = (url: string): undefined | string =>
  url.match(youtubeUrlRegEx)?.[8];

const YouTubePlayer: FunctionComponent<{
  readonly videoId: string;
  readonly autoplay: boolean;
  readonly loop: boolean;
  readonly width: string;
  readonly height: string;
}> = ({ videoId, autoplay, loop, width, height }) => (
  <iframe
    width={width}
    height={height}
    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${
      autoplay ? `1` : `0`
    }&loop=${loop ? `1&playlist=${videoId}` : `0`}&modestbranding=1`}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  ></iframe>
);

const useAnimationFrame = (fn: () => void, deps: DependencyList): void => {
  useEffect(() => {
    let next: number | null = null;
    const onTick = (): void => {
      if (next === null) {
        return;
      }
      fn();
      next = requestAnimationFrame(onTick);
    };
    next = requestAnimationFrame(onTick);
    return () => {
      if (next) {
        cancelAnimationFrame(next);
      }
      next = null;
    };
  }, deps);
};

const useAnimationFrameMemo = <T,>(fn: () => T, deps: DependencyList): T => {
  const [state, setState] = useState(fn);

  useAnimationFrame(() => setState(fn()), deps);

  return state;
};

const useSynth = (): undefined | SpeechSynthesis =>
  useMemo(
    () =>
      typeof window === `object` && typeof window.speechSynthesis === `object`
        ? window.speechSynthesis
        : undefined,
    [typeof window],
  );

const useSynthVoices = (
  synth: undefined | SpeechSynthesis,
): SpeechSynthesisVoice[] => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!synth) {
      setVoices([]);
      return () => void 0;
    }
    const onVoicesChanged = (): void => {
      setVoices(synth.getVoices());
    };
    synth.addEventListener(`voiceschanged`, onVoicesChanged);
    onVoicesChanged();
    return () => {
      synth.removeEventListener(`voiceschanged`, onVoicesChanged);
    };
  }, [synth]);

  return voices;
};

type SynthState = {
  readonly isSpeaking?: boolean;
  readonly isPaused?: boolean;
};

const useSynthState = (synth?: SpeechSynthesis): SynthState =>
  useAnimationFrameMemo(
    () => ({
      isSpeaking: synth?.speaking,
      isPaused: synth?.paused,
    }),
    [synth],
  );

const VoiceCommand = z.object({
  text: z.string(),
  voiceUri: z.string().optional(),
  volume: z.number().min(0).max(1),
  pitch: z.number().min(0.1).max(10),
  rate: z.number().min(0).max(2),
});

type VoiceCommand = z.infer<typeof VoiceCommand>;
type PlayState = `stop` | `play` | `pause`;

type PlayProgess = {
  readonly prevCharIndex?: number;
  readonly lastCharIndex?: number;
};

type TextParts = {
  readonly prev?: string;
  readonly current?: string;
  readonly next?: string;
};

const VoiceControls: FunctionComponent<{
  readonly command?: VoiceCommand;
  readonly synth?: SpeechSynthesis;
  readonly voices: SpeechSynthesisVoice[];
  readonly highlight?: boolean;
  readonly onPlayStateChange?: (playState: PlayState) => void;
}> = ({ command, synth, voices, highlight, onPlayStateChange }) => {
  const { isSpeaking, isPaused } = useSynthState(synth);

  const [playProgress, setPlayProgress] = useState<PlayProgess>({
    prevCharIndex: undefined,
    lastCharIndex: undefined,
  });

  const textParts = useMemo((): TextParts => {
    if (!playProgress.prevCharIndex) {
      if (!playProgress.lastCharIndex) {
        return {
          prev: undefined,
          current: undefined,
          next: command?.text,
        };
      }
      return {
        prev: undefined,
        current: command?.text.slice(0, playProgress.lastCharIndex),
        next: command?.text.slice(playProgress.lastCharIndex),
      };
    }
    if (!playProgress.lastCharIndex) {
      return {
        prev: command?.text.slice(0, playProgress.prevCharIndex),
        current: undefined,
        next: command?.text.slice(playProgress.prevCharIndex),
      };
    }
    return {
      prev: command?.text.slice(0, playProgress.prevCharIndex),
      current: command?.text.slice(
        playProgress.prevCharIndex,
        playProgress.lastCharIndex,
      ),
      next: command?.text.slice(playProgress.lastCharIndex),
    };
  }, [command?.text, playProgress.prevCharIndex, playProgress.lastCharIndex]);

  useEffect(() => {
    if (onPlayStateChange) {
      onPlayStateChange(isPaused ? `pause` : isSpeaking ? `play` : `stop`);
    }
  }, [onPlayStateChange, isSpeaking, isPaused]);

  return (
    <Flex flexDirection={`column`} gap={2}>
      <Flex flexDirection={`row`} gap={2}>
        <Button
          size="sm"
          flex={1}
          rightIcon={<Icon as={MdPlayArrow} />}
          isDisabled={isSpeaking && !isPaused}
          onClick={() => {
            if (!synth) {
              return;
            }
            if (synth.paused) {
              synth.resume();
              return;
            }
            if (command) {
              const u = new SpeechSynthesisUtterance(command.text);
              u.voice =
                voices.find((voice) => voice.voiceURI === command.voiceUri) ??
                null;
              u.volume = command.volume;
              u.pitch = command.pitch;
              u.rate = command.rate;
              const onBoundary = (event: SpeechSynthesisEvent): void => {
                setPlayProgress((playProgress) => ({
                  prevCharIndex: playProgress.lastCharIndex,
                  lastCharIndex: event.charIndex,
                }));
              };
              u.addEventListener(`boundary`, onBoundary);
              u.addEventListener(`end`, () => {
                setPlayProgress(() => ({
                  prevCharIndex: command.text.length - 1,
                  lastCharIndex: command.text.length - 1,
                }));
                u.removeEventListener(`boundary`, onBoundary);
              });
              setPlayProgress({
                prevCharIndex: undefined,
                lastCharIndex: undefined,
              });
              synth.speak(u);
            }
          }}
        >
          <Text display={{ base: `none`, sm: `inline` }}>Play</Text>
        </Button>
        <Button
          size="sm"
          flex={1}
          rightIcon={<Icon as={MdPause} />}
          isDisabled={!isSpeaking}
          onClick={() => synth?.pause()}
        >
          <Text display={{ base: `none`, sm: `inline` }}>Pause</Text>
        </Button>
        <Button
          size="sm"
          flex={1}
          rightIcon={<Icon as={MdStop} />}
          isDisabled={!isSpeaking}
          onClick={() => {
            synth?.cancel();
            setPlayProgress({
              prevCharIndex: undefined,
              lastCharIndex: undefined,
            });
          }}
        >
          <Text display={{ base: `none`, sm: `inline` }}>Stop</Text>
        </Button>
      </Flex>
      {highlight && (
        <Box>
          {textParts.prev && (
            <Text display={`inline`} bgColor="yellow.100">
              {textParts.prev}
            </Text>
          )}
          {textParts.current && (
            <Text display={`inline`} bgColor="yellow.300">
              {textParts.current}
            </Text>
          )}
          {textParts.next && <Text display={`inline`}>{textParts.next}</Text>}
        </Box>
      )}
    </Flex>
  );
};

const VoiceCommandInput: FunctionComponent<{
  readonly synth?: SpeechSynthesis;
  readonly voices: SpeechSynthesisVoice[];
  readonly value: VoiceCommand;
  readonly isDisabled: boolean;
  readonly onChange: (voiceCommand: VoiceCommand) => void;
}> = ({ synth, voices, value, isDisabled, onChange }) => {
  const volumeTooltip = useDisclosure({ defaultIsOpen: false });
  const rateTooltip = useDisclosure({ defaultIsOpen: false });
  const pitchTooltip = useDisclosure({ defaultIsOpen: false });
  return (
    <Flex flexDirection={`column`} gap={4}>
      <FormControl isDisabled={isDisabled}>
        <FormLabel>Text</FormLabel>
        <Input
          type="text"
          value={value.text}
          onChange={({ target: { value: text } }) =>
            onChange({ ...value, text })
          }
          size="sm"
        />
      </FormControl>
      <FormControl isDisabled={isDisabled}>
        <FormLabel>Voice</FormLabel>
        <Select
          size="sm"
          value={value.voiceUri}
          onChange={({ target: { value: voiceUri } }) =>
            onChange({ ...value, voiceUri })
          }
          placeholder="Select voice"
        >
          {voices.map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isDisabled={isDisabled}>
        <FormLabel>Volume</FormLabel>
        <Slider
          isDisabled={isDisabled}
          size="sm"
          mb={4}
          min={0}
          max={100}
          value={value.volume * 100}
          onChange={(percent) => onChange({ ...value, volume: percent / 100 })}
          onMouseEnter={volumeTooltip.onOpen}
          onMouseLeave={volumeTooltip.onClose}
        >
          {range(4 + 1).map((k) => (
            <SliderMark
              key={k}
              value={(100 * k) / 4}
              mt={2}
              transform={`translateX(${k === 0 ? 0 : k === 4 ? -100 : -50}%)`}
              className="slider-mark"
              fontSize={`sm`}
            >{`${Math.round((100 * k) / 4)}%`}</SliderMark>
          ))}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            isOpen={volumeTooltip.isOpen}
            label={`${Math.round(value.volume * 100)}%`}
            placement="top"
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </FormControl>
      <FormControl isDisabled={isDisabled}>
        <FormLabel>Rate</FormLabel>
        <Slider
          isDisabled={isDisabled}
          size="sm"
          mb={4}
          min={0}
          max={200}
          value={value.rate * 100}
          onChange={(percent) => onChange({ ...value, rate: percent / 100 })}
          onMouseEnter={rateTooltip.onOpen}
          onMouseLeave={rateTooltip.onClose}
        >
          {range(4 + 1).map((k) => (
            <SliderMark
              key={k}
              value={(200 * k) / 4}
              transform={`translateX(${k === 0 ? 0 : k === 8 ? -100 : -50}%)`}
              mt={2}
              fontSize={`sm`}
            >{`${(2 * k) / 4}`}</SliderMark>
          ))}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            isOpen={rateTooltip.isOpen}
            label={`${Math.round(value.rate * 100) / 100}`}
            placement="top"
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </FormControl>
      <FormControl isDisabled={isDisabled}>
        <FormLabel>Pitch</FormLabel>
        <Slider
          isDisabled={isDisabled}
          size="sm"
          mb={4}
          min={-100}
          max={100}
          value={Math.log10(value.pitch) * 100}
          onChange={(percent) =>
            onChange({ ...value, pitch: Math.pow(10, percent / 100) })
          }
          onMouseEnter={pitchTooltip.onOpen}
          onMouseLeave={pitchTooltip.onClose}
        >
          {range(4 + 1).map((k) => (
            <SliderMark
              key={k}
              value={(200 * k) / 4 - 100}
              transform={`translateX(${k === 0 ? 0 : k === 8 ? -100 : -50}%)`}
              mt={2}
              fontSize={`sm`}
            >{`${
              Math.round(100 * Math.pow(10, ((200 * k) / 4 - 100) / 100)) / 100
            }`}</SliderMark>
          ))}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            isOpen={pitchTooltip.isOpen}
            label={`${Math.round(value.pitch * 100) / 100}`}
            placement="top"
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </FormControl>
      <VoiceControls
        voices={voices}
        command={value}
        highlight={false}
        synth={synth}
      />
    </Flex>
  );
};

const weekdays = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Saturday`,
] as const;

const TaskSchedule = z.union([
  z.object({
    kind: z.literal(`once`),
    date: z.string(),
  }),
  z.object({
    kind: z.literal(`repeat`),
    weekdays: z.boolean().array().length(7),
    time: z.object({
      hour: z.number().min(0).max(29),
      minute: z.number().min(0).max(59),
    }),
  }),
]);

type TaskSchedule = z.infer<typeof TaskSchedule>;

const TaskChallenge = z.union([
  z.object({
    kind: z.literal(`basic`),
  }),
  z.object({
    kind: z.literal(`pin`),
    pin: z.string(),
  }),
  z.object({
    kind: z.literal(`math`),
    iterations: z.number().int().min(1).max(10),
  }),
]);

type TaskChallenge = z.infer<typeof TaskChallenge>;

const Task = z.object({
  id: z.string().uuid(),
  isEnabled: z.boolean(),
  command: VoiceCommand.optional(),
  youtubeUrl: z.string().regex(youtubeUrlRegEx).optional(),
  title: z.string(),
  notification: z.boolean(),
  schedule: TaskSchedule,
  loopIntervalMs: z.number().int().min(5000).optional(),
  dismissChallenge: TaskChallenge.optional(),
  snoozeChallenge: TaskChallenge.optional(),
});

type Task = z.infer<typeof Task>;

const saveConfig = (config: Config): void => {
  window.localStorage.setItem(storageKey, JSON.stringify(config, null, 2));
};

const TaskScheduleOnceInput: FunctionComponent<{
  readonly isDisabled: boolean;
  readonly value: Extract<TaskSchedule, { kind: `once` }>;
  readonly onChange: (value: Extract<TaskSchedule, { kind: `once` }>) => void;
}> = ({ isDisabled, value, onChange }) => {
  const date = useMemo(() => new Date(value.date), [value.date]);
  return (
    <ReactDatePicker
      showTimeInput
      selected={date}
      onChange={(date) => {
        if (date) {
          onChange({ kind: `once`, date: date.toISOString() });
        }
      }}
      timeFormat="p"
      dateFormat={`Pp`}
      disabled={isDisabled}
      inline
    />
  );
};

const TaskScheduleRepeatInput: FunctionComponent<{
  readonly isDisabled: boolean;
  readonly value: Extract<TaskSchedule, { kind: `repeat` }>;
  readonly onChange: (value: Extract<TaskSchedule, { kind: `repeat` }>) => void;
}> = ({ isDisabled, value, onChange }) => (
  <Flex flexDirection={`row`} gap={2}>
    <Flex flexDirection={`column`} flex={1}>
      {weekdays.map((label, index) => (
        <Checkbox
          key={index}
          isDisabled={isDisabled}
          isChecked={value.weekdays[index]}
          onChange={() =>
            onChange({
              ...value,
              weekdays: value.weekdays.map((prevValue, prevIndex) =>
                prevIndex === index ? !prevValue : prevValue,
              ),
            })
          }
        >
          {label}
        </Checkbox>
      ))}
    </Flex>
    <FormControl flex={1}>
      <FormLabel>Time</FormLabel>
      <Input
        type="time"
        value={`${value.time.hour
          .toString()
          .padStart(2, `0`)}:${value.time.minute.toString().padStart(2, `0`)}`}
        size="sm"
        onReset={() =>
          onChange({
            ...value,
            time: {
              hour: 9,
              minute: 0,
            },
          })
        }
        onChange={({ target: { value: time } }) => {
          const [hour, minute] = time.split(`:`).map((t) => parseInt(t, 10));
          onChange({
            ...value,
            time: {
              hour:
                Number.isInteger(hour) && 0 <= hour && hour <= 23
                  ? hour
                  : value.time.hour,
              minute:
                Number.isInteger(minute) && 0 <= minute && minute <= 59
                  ? minute
                  : value.time.minute,
            },
          });
        }}
      />
    </FormControl>
  </Flex>
);

const TaskEditModal: FunctionComponent<{
  readonly synth?: SpeechSynthesis;
  readonly voices: SpeechSynthesisVoice[];
  readonly isDisabled: boolean;
  readonly value: Task;
  readonly onChange: (value: Task) => void;
  readonly onCancel: () => void;
  readonly onSave: () => void;
}> = ({ synth, voices, isDisabled, value, onChange, onCancel, onSave }) => {
  return (
    <Modal isOpen onClose={onCancel} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={onSave}>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={`flex`} flexDirection="column" gap={3}>
          <Checkbox
            isDisabled={isDisabled}
            isChecked={value.isEnabled}
            onChange={() => onChange({ ...value, isEnabled: !value.isEnabled })}
          >
            Enabled
          </Checkbox>
          <FormControl isRequired isDisabled={isDisabled}>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={value.title}
              onChange={({ target: { value: title } }) =>
                onChange({ ...value, title })
              }
              size="sm"
            />
          </FormControl>
          <Divider />
          {window.Notification && (
            <Checkbox
              isChecked={value.notification}
              isDisabled={isDisabled}
              onChange={() => {
                if (value.notification) {
                  onChange({ ...value, notification: false });
                  return;
                }
                if (Notification.permission === `granted`) {
                  onChange({ ...value, notification: true });
                  return;
                }
                Notification.requestPermission().then((permission) =>
                  onChange({
                    ...value,
                    notification: permission === `granted`,
                  }),
                );
              }}
            >
              Notification
            </Checkbox>
          )}
          <Divider />
          <FormControl>
            <Checkbox
              isDisabled={isDisabled}
              isChecked={typeof value.youtubeUrl === `string`}
              onChange={() => {
                if (typeof value.youtubeUrl === `string`) {
                  onChange({ ...value, youtubeUrl: undefined });
                } else {
                  onChange({
                    ...value,
                    youtubeUrl: `https://www.youtube-nocookie.com/embed/9aDEq3u5huA`,
                  });
                }
              }}
            >
              YouTube
            </Checkbox>
          </FormControl>
          {typeof value.youtubeUrl === `string` && (
            <Flex
              pl={4}
              borderLeftColor="gray.200"
              borderLeftWidth={1}
              flexDirection="column"
              gap={2}
            >
              <FormControl isRequired>
                <FormLabel>YouTube URL</FormLabel>
                <Input
                  isDisabled={isDisabled}
                  type={`url`}
                  pattern={youtubeUrlRegEx.source}
                  value={value.youtubeUrl}
                  onChange={({ target: { value: youtubeUrl } }) => {
                    if (youtubeUrlRegEx.test(youtubeUrl)) {
                      onChange({
                        ...value,
                        youtubeUrl,
                      });
                    }
                  }}
                  size="sm"
                />
              </FormControl>
              <YouTubePlayer
                autoplay={false}
                height="100px"
                width="100%"
                videoId={getYoutubeVideoId(value.youtubeUrl) ?? ``}
                loop={false}
              />
            </Flex>
          )}
          <Divider />
          <Checkbox
            isChecked={typeof value.command === `object`}
            isDisabled={isDisabled}
            onChange={() => {
              if (value.command) {
                onChange({ ...value, command: undefined });
              } else {
                onChange({
                  ...value,
                  command: {
                    pitch: 1,
                    rate: 1,
                    text: value.title,
                    volume: 1,
                    voiceUri:
                      voices.length > 0 ? voices[0].voiceURI : undefined,
                  },
                });
              }
            }}
          >
            Voice command
          </Checkbox>
          <Flex
            pl={4}
            flexDirection="column"
            borderLeftColor="gray.200"
            borderLeftWidth={1}
          >
            {value.command && (
              <VoiceCommandInput
                isDisabled={isDisabled}
                value={value.command}
                synth={synth}
                voices={voices}
                onChange={(command) => onChange({ ...value, command })}
              />
            )}
          </Flex>
          <Divider />
          <FormControl as="fieldset">
            <FormLabel as="legend">Schedule</FormLabel>
            <RadioGroup
              value={value.schedule.kind}
              onChange={(kind) =>
                onChange({
                  ...value,
                  schedule:
                    kind === `once`
                      ? {
                          kind: `once`,
                          date: new Date(
                            Date.now() + 60 * 5 * 1000,
                          ).toISOString(),
                        }
                      : {
                          kind: `repeat`,
                          time: {
                            hour: 9,
                            minute: 0,
                          },
                          weekdays: [true, true, true, true, true, true, true],
                        },
                })
              }
            >
              <Flex flexDirection={`row`} gap={2}>
                <Radio value="once">Once</Radio>
                <Radio value="repeat">Repeat</Radio>
              </Flex>
            </RadioGroup>
          </FormControl>
          <Flex
            pl={4}
            flexDirection="column"
            borderLeftColor="gray.200"
            borderLeftWidth={1}
            position="relative"
          >
            {value.schedule.kind === `once` ? (
              <TaskScheduleOnceInput
                isDisabled={isDisabled}
                value={value.schedule}
                onChange={(schedule) => onChange({ ...value, schedule })}
              />
            ) : value.schedule.kind === `repeat` ? (
              <TaskScheduleRepeatInput
                isDisabled={isDisabled}
                value={value.schedule}
                onChange={(schedule) => onChange({ ...value, schedule })}
              />
            ) : null}
          </Flex>
          <Divider />
          <Checkbox
            isChecked={typeof value.loopIntervalMs === `number`}
            onChange={() =>
              onChange({
                ...value,
                loopIntervalMs:
                  typeof value.loopIntervalMs === `number` ? undefined : 5000,
              })
            }
          >
            Loop
          </Checkbox>
          {typeof value.loopIntervalMs === `number` && (
            <Flex
              pl={4}
              borderLeftColor="gray.200"
              borderLeftWidth={1}
              flexDirection="column"
            >
              <FormControl isDisabled={isDisabled} isRequired>
                <FormLabel>Loop interval (in seconds)</FormLabel>
                <NumberInput
                  allowMouseWheel
                  value={Math.round(value.loopIntervalMs / 1000)}
                  min={1}
                  max={600}
                  step={1}
                  onChange={(_, intervalSeconds) =>
                    onChange({
                      ...value,
                      loopIntervalMs: intervalSeconds * 1000,
                    })
                  }
                  size="sm"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter display={`flex`} flexWrap="wrap" gap={2}>
          <Button onClick={onCancel} colorScheme="red">
            Cancel
          </Button>
          <Button type="submit" onClick={onSave} colorScheme="green">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const TaskList: FunctionComponent<{
  readonly synth?: SpeechSynthesis;
  readonly voices: SpeechSynthesisVoice[];
  readonly isDisabled: boolean;
  readonly tasks: Task[];
  readonly onChangeTasks: (tasks: Task[]) => void;
}> = ({ synth, voices, isDisabled, tasks, onChangeTasks }) => {
  const [taskEdit, onTaskEditChange] = useState<undefined | Task>(undefined);

  return (
    <Flex flexDirection={`column`} gap={2}>
      {taskEdit !== undefined && (
        <TaskEditModal
          synth={synth}
          voices={voices}
          isDisabled={isDisabled}
          value={taskEdit}
          onChange={onTaskEditChange}
          onCancel={() => onTaskEditChange(undefined)}
          onSave={() => {
            onChangeTasks([...tasks, taskEdit]);
            onTaskEditChange(undefined);
          }}
        />
      )}
      <Button
        onClick={() => {
          onTaskEditChange({
            id: createUuidV4(),
            isEnabled: true,
            notification: false,
            schedule: {
              kind: `once`,
              date: new Date(Date.now() + 60 * 5 * 1000).toISOString(),
            },
            title: `New task`,
          });
        }}
        isDisabled={isDisabled}
      >
        Create new task
      </Button>
    </Flex>
  );
};

const Config = z.object({
  update: z.string().optional(),
  tasks: Task.array(),
});

type Config = z.infer<typeof Config>;

const storageKey = `@lifemod/config`;

const createDefaultConfig = (): Config => ({
  tasks: [],
  update: undefined,
});

const loadConfig = (): Config => {
  try {
    return Config.parse(
      JSON.parse(window.localStorage.getItem(storageKey) ?? ``),
    );
  } catch (error) {
    console.error(error);
    return createDefaultConfig();
  }
};

const DoItNowPage: FunctionComponent = () => {
  const synth = useSynth();
  const voices = useSynthVoices(synth);

  const [config, setConfig] = useState<undefined | Config>(undefined);

  useEffect(() => {
    if (config !== undefined) {
      return;
    }
    setConfig(loadConfig());
  }, [config]);

  const onChangeTasks = useCallback(
    (tasks: Task[]) =>
      setConfig((config) => ({
        ...config,
        tasks,
        update: new Date().toISOString(),
      })),
    [],
  );

  return (
    <Container
      maxW={`container.md`}
      display="flex"
      flexDirection={`column`}
      gap={4}
    >
      <Heading>Do It Now</Heading>
      <TaskList
        synth={synth}
        voices={voices}
        isDisabled={!config}
        tasks={config ? config.tasks : []}
        onChangeTasks={onChangeTasks}
      />
    </Container>
  );
};

export default DoItNowPage;
