import { createTheme} from "@mui/material";
import { shape } from "@mui/system";
//import { Global, css } from '@emotion/react'   //i added this while installation when i was getting dependency conflict from @mui/styles  but even this did not work

const MainTheme = createTheme({
  palette: {
    primary: {
      main: '#0a4baf',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: '#757575',
    },
  },
  spacing: 8,
  components: {
    MuiPaper: {
      variants: [
        {
          props: {
            variant: "login1",
          },
          style: {
            backgroundColor: '#2E3A45',
            elevation: 1,
            padding: '24px',
            height: "auto",
            width: '400px',
            maxWidth: '90%',
            margin: '20px auto',
            borderRadius: '8px',
          },
        },
      ],
    },
  },
});

export default MainTheme;