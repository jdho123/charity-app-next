export default function DiaryChristmas({ className = '' }) {
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

      <image href="/images/diaryChristmas.png" x="0" y="0" width="1300" height="924" />

      <text
        x="300"
        y="130"
        fontFamily="Arial, sans-serif"
        fontSize="36"
        fill="#FFDD00"
        textAnchor="start"
        className="gloria"
      >
        <tspan x="300" dy="0">
          The Light of
        </tspan>
        <tspan x="300" dy="1.2em">
          Christmas
        </tspan>
      </text>

      <text
        x="260"
        y="200"
        fontFamily="Arial, sans-serif"
        fontSize="17"
        fill="#FFEF9A"
        textAnchor="start"
        className="handwritten"
      >
        <tspan x="300" dy="0">
          During the same visit, which happened to be
        </tspan>
        <tspan x="260" dy="1.2em">
          around Christmas, we brought string lights to
        </tspan>
        <tspan x="260" dy="1.2em">
          decorate the school. We wanted to surprise the
        </tspan>
        <tspan x="230" dy="1.2em">
          children and create a moment of joy amidst their daily
        </tspan>
        <tspan x="240" dy="1.2em">
          struggles. As we started setting up the lights, one
        </tspan>
        <tspan x="240" dy="1.2em">
          curious child peeked out from behind a door. His face
        </tspan>
        <tspan x="240" dy="1.2em">
          lit up with wonder, scanning the room to ensure no
        </tspan>
        <tspan x="250" dy="1.2em">
          no teachers were nearby before stepping out further.
        </tspan>
        <tspan x="270" dy="1.2em">
          His eyes widened slightly, and a sincere smile
        </tspan>
        <tspan x="270" dy="1.2em">
          stretched from ear to ear.
        </tspan>
      </text>

      <text
        x="690"
        y="250"
        fontFamily="Arial, sans-serif"
        fontSize="20"
        fill="#FFEF9A"
        textAnchor="start"
        className="handwritten"
      >
        <tspan x="945" dy="0">
          Moments later, more children
        </tspan>
        <tspan x="945" dy="1.2em">
          began to gather, their faces
        </tspan>
        <tspan x="945" dy="1.2em">
          glowing with excitement and
        </tspan>
        <tspan x="945" dy="1.2em">
          amazement. Their laughter
        </tspan>
        <tspan x="945" dy="1.2em">
          and joy filled the room as
        </tspan>
        <tspan x="945" dy="1.2em">
          they took in the simple yet
        </tspan>
        <tspan x="945" dy="1.2em">
          magical transformation of
        </tspan>
        <tspan x="945" dy="1.2em">
          school. It was just a stretch
        </tspan>
        <tspan x="945" dy="1.2em">
          of string lights—nothing
        </tspan>
        <tspan x="690" dy="1.2em">
          compared to the grand decorations in cities — but to these
        </tspan>
        <tspan x="690" dy="1.2em">
          children, it was a beacon of hope and happiness.
        </tspan>
        <tspan x="690" dy="3em">
          This small act of giving resonated with us long after that
        </tspan>
        <tspan x="690" dy="1.2em">
          evening. It reminded us that even the simplest gestures can
        </tspan>
        <tspan x="690" dy="1.2em">
          spark immense joy and provide a sense of wonder. The
        </tspan>
        <tspan x="690" dy="1.2em">
          children's smiles and laughter renewed our commitment to
        </tspan>
        <tspan x="690" dy="1.2em">
          the project, showing us the profound impact that love,
        </tspan>
        <tspan x="690" dy="1.2em">
          attention, and small acts of kindness can have on their lives.
        </tspan>
      </text>
    </svg>
  );
}
