import { Pretendard } from "./font";
import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    fonts: {
      heading: Pretendard.style.fontFamily,
      body: Pretendard.style.fontFamily,
    },
    fontWeights: {
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    fontSizes: {
      xs: "12px",
      s: "14px",
      m: "16px",
      l: "20px",
      xl: "24px",
    },
    shadows: {
      card: "0px 4px 30px rgba(13, 41, 140, 0.1)",
    },
    radii: {
      card: "12px",
      button: "8px",
    },
    colors: {
      primary: {
        _default: "#30336b",
        shade1: "#7174e8",
      },
      secondary: "#7174e8",
      success: "#00a870",
      danger: "#ff4d4f",
      warning: "#ffad1f",
      grey: {
        _default: "#bfbfbf",
        shade1: "#f0f0f0",
      },
    },
    semanticTokens: {
      colors: {
        primary: "primary._default",
        gray: "grey._default",
      },
    },
    components: {
      Button: {
        baseStyle: {
          fontSize: "m",
          fontWeight: "medium",
          borderRadius: "8px",
        },
        sizes: {
          md: {
            h: "40px",
            fontSize: "m",
            px: 6,
          },
        },
        variants: {
          solid: {
            bg: "primary._default",
            color: "white",
            fontWeight: "semibold",
            _hover: {
              bg: "primary.shade1",
            },
          },
        },
        defaultProps: {
          size: "md",
          variant: "solid",
          colorScheme: "primary",
        },
      },
      Input: {
        baseStyle: {},
        sizes: {
          md: {
            field: {
              fontSize: "14px",
            },
          },
        },
        variants: {
          outline: {
            field: {
              borderColor: "grey._default",
              color: "black",
              _hover: {
                borderColor: "primary._default",
              },
              _focusVisible: {
                borderColor: "primary.shade1",
              },
              _placeholder: {
                color: "grey.shade1",
              },
            },
          },
        },
        defaultProps: {
          variant: "outline",
        },
      },
      Card: {
        baseStyle: {
          container: {
            bg: "white",
            shadow: "card",
            color: "black",
            borderRadius: "card",
          },
        },
        sizes: {
          md: {
            container: {
              p: 4,
            },
          },
        },
        variants: {
          elevated: {
            container: {
              shadow: "0px 4px 30px rgba(0, 0, 0, 0.08)",
            },
          },
        },
      },
      Tabs: {
        baseStyle: {
          tablist: {
            gap: 2,
            borderBottom: "2px solid",
            borderColor: "grey.shade1",
          },
        },
        sizes: {
          sm: {
            tab: {
              fontSize: "xs",
              fontWeight: "medium",
            },
          },
        },
        variants: {
          outlined: {
            tab: {
              px: "12px",
              h: "36px",
              borderRadius: "8px",
              _selected: {
                color: "primary._default",
                fontWeight: "semibold",
              },
            },
          },
        },
      },
      Modal: {
        baseStyle: {
          dialog: {
            bg: "white",
            borderRadius: "card",
            shadow: "card",
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
    components: ["Button", "Input", "Tabs"],
  })
);
