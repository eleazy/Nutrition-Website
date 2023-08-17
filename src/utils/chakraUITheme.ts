import { extendTheme } from "@chakra-ui/react";

export const myTheme = extendTheme({
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          bg: "transparent",
        },
      },
    },
  },
});
