import { extendTheme } from "@chakra-ui/react";

export const colors = {
  link: `blue.600`,
  linkHover: `blue.400`,
} as const;

export const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        color: colors.link,
        _hover: {
          textDecoration: `underline`,
          color: colors.linkHover,
        },
      },
    },
  },
});
