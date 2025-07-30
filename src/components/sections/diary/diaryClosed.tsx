export default function DiaryClosed({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="600"
      viewBox="0 0 1300 924"
      className={`${className}`}
    >
      <defs>
        <style type="text/css">{`
      @font-face {
        font-family: 'Indie Flower';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/indieflower/v23/m8JVjfNVeKWVnh3QMuKkFcZVaUuH.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      @font-face {
        font-family: 'Gloria Hallelujah';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/gloriahallelujah/v23/LYjYdHv3kUk9BMV96EIswT9DIbW-MIS11zM.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      .handwritten {
        font-family: 'Indie Flower', sans-serif;
      }

      .gloria {
        font-family: 'Gloria Hallelujah';
      }
    `}</style>
      </defs>

      <image href="images/diaryClosed.png" x="0" y="0" width="1300" height="924" />

      <text
        x="550"
        y="500"
        fontFamily="Arial, sans-serif"
        fontSize="64"
        fill="#f5deb3"
        textAnchor="start"
        className="gloria"
      >
        the Diary
      </text>

      <text
        x="550"
        y="690"
        fontFamily="Arial, sans-serif"
        fontSize="28"
        fill="#f5deb3"
        textAnchor="start"
        className="gloria"
      >
        <tspan x="570" dy="0">
          Lighting the Path
        </tspan>
        <tspan x="550" dy="1.2em">
          Where Kindness Lives
        </tspan>
      </text>
    </svg>
  );
}
