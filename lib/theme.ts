import { extendTheme, Theme } from "@chakra-ui/core";

export const colors = {
  link: "blue.600",
  linkHover: "blue.400",
} as const;

export const theme: Theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        color: colors.link,
        _hover: {
          textDecoration: "underline",
          color: colors.linkHover,
        },
      },
    },
  },
});
