import { extendTheme } from "@chakra-ui/react";

export const colors = {
  link: `blue.600`,
  linkHover: `blue.400`,
} as const;

export const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        _hover: {
          color: colors.linkHover,
          textDecoration: `underline`,
        },
        color: colors.link,
      },
    },
  },
});
