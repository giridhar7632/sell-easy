import React from 'react'

function GenerateIcon(data, props) {
  const children = data.child.map((item) =>
    React.createElement(item.tag, { ...item.attr, key: Math.random() })
  )
  return React.createElement(data.tag, { ...data.attr, ...props }, children)
}

export function ArrowLeft(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M5 12l14 0',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M5 12l6 6',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M5 12l6 -6',
          },
        },
      ],
    },
    props
  )
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="" />
  <path d="" />
</svg>*/
}

export function Search(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'circle',
          attr: { cx: 10, cy: 10, r: 7 },
        },
        { tag: 'line', attr: { x1: '18', y1: '18', x2: '15', y2: '15' } },
      ],
    },
    props
  )
}

export function User(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 19 19',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M9 8.5C10.933 8.5 12.5 6.933 12.5 5C12.5 3.067 10.933 1.5 9 1.5C7.067 1.5 5.5 3.067 5.5 5C5.5 6.933 7.067 8.5 9 8.5ZM9 10C11.7614 10 14 7.76142 14 5C14 2.23858 11.7614 0 9 0C6.23858 0 4 2.23858 4 5C4 7.76142 6.23858 10 9 10Z',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M6 13.75C3.65279 13.75 1.75 15.6528 1.75 18V19C1.75 19.4142 1.41421 19.75 1 19.75C0.585786 19.75 0.25 19.4142 0.25 19V18C0.25 14.8244 2.82436 12.25 6 12.25H12C15.1756 12.25 17.75 14.8244 17.75 18V19C17.75 19.4142 17.4142 19.75 17 19.75C16.5858 19.75 16.25 19.4142 16.25 19V18C16.25 15.6528 14.3472 13.75 12 13.75H6Z',
          },
        },
      ],
    },
    props
  )
}

export function Send(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M10 14l11 -11',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5',
          },
        },
      ],
    },
    props
  )
}

export function Logout(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M7 12h14l-3 -3m0 6l3 -3',
          },
        },
      ],
    },
    props
  )
}

export function Cart(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'circle',
          attr: { cx: 6, cy: 19, r: 2 },
        },
        {
          tag: 'circle',
          attr: { cx: 17, cy: 19, r: 2 },
        },
        {
          tag: 'path',
          attr: {
            d: 'M17 17h-11v-14h-2',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M6 5l14 1l-1 7h-13',
          },
        },
      ],
    },
    props
  )
}

export function AddToCart(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'circle',
          attr: { cx: 6, cy: 19, r: 2 },
        },
        {
          tag: 'circle',
          attr: { cx: 17, cy: 19, r: 2 },
        },
        {
          tag: 'path',
          attr: {
            d: 'M17 17h-11v-14h-2',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M6 5l6.005 .429m7.138 6.573l-.143 .998h-13',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M15 6h6m-3 -3v6',
          },
        },
      ],
    },
    props
  )
}

export function Heart(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572',
          },
        },
      ],
    },
    props
  )
}

export function Bag(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 20 19',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M3.69865 5L8.09725 0.784674C9.16095 -0.234702 10.839 -0.234703 11.9027 0.784674L16.3013 5H18.847C19.4555 5 19.923 5.53899 19.8369 6.14142L18.368 16.4243C18.1568 17.9022 16.8911 19 15.3981 19H4.6019C3.10895 19 1.84318 17.9022 1.63205 16.4243L0.16307 6.14142C0.0770085 5.53899 0.544471 5 1.15302 5H3.69865ZM9.13511 1.86766C9.61861 1.4043 10.3814 1.4043 10.8649 1.86766L14.1334 5H5.86658L9.13511 1.86766ZM1.72952 6.5L3.11697 16.2121C3.22254 16.9511 3.85542 17.5 4.6019 17.5H15.3981C16.1446 17.5 16.7775 16.9511 16.883 16.2121L18.2705 6.5H1.72952Z',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M6 9.25C6.41421 9.25 6.75 9.58579 6.75 10V14C6.75 14.4142 6.41421 14.75 6 14.75C5.58579 14.75 5.25 14.4142 5.25 14V10C5.25 9.58579 5.58579 9.25 6 9.25Z',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M10 9.25C10.4142 9.25 10.75 9.58579 10.75 10V14C10.75 14.4142 10.4142 14.75 10 14.75C9.58579 14.75 9.25 14.4142 9.25 14V10C9.25 9.58579 9.58579 9.25 10 9.25Z',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M14 9.25C14.4142 9.25 14.75 9.58579 14.75 10V14C14.75 14.4142 14.4142 14.75 14 14.75C13.5858 14.75 13.25 14.4142 13.25 14V10C13.25 9.58579 13.5858 9.25 14 9.25Z',
          },
        },
      ],
    },
    props
  )
}

export function ChevronRight(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [{ tag: 'polyline', attr: { points: '9 6 15 12 9 18' } }],
    },
    props
  )
}

export function Message(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4',
          },
        },
        { tag: 'line', attr: { x1: '8', y1: '9', x2: '16', y2: '9' } },
        { tag: 'line', attr: { x1: '8', y1: '13', x2: '14', y2: '13' } },
      ],
    },
    props
  )
}
export function ChevronLeft(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [{ tag: 'polyline', attr: { points: '15 6 9 12 15 18' } }],
    },
    props
  )
}

export function Close(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' },
        },
        { tag: 'line', attr: { x1: '18', y1: '6', x2: '6', y2: '18' } },
        { tag: 'line', attr: { x1: '6', y1: '6', x2: '18', y2: '18' } },
      ],
    },
    props
  )
}

export function Facebook(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
          },
        },
      ],
    },
    props
  )
}

{
  /* <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mail" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <rect x="3" y="5" width="18" height="14" rx="2" />
  <polyline points="3 7 12 13 21 7" />
</svg> */
}
export function Email(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        { tag: 'rect', attr: { x: 3, y: 5, width: 18, height: 14, rx: 2 } },
        { tag: 'polyline', attr: { points: '3 7 12 13 21 7' } },
      ],
    },
    props
  )
}

export function Github(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        width: props.size || '24',
        height: props.size || '24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      child: [
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            d: 'M9 19C4.7 20.4 4.7 16.5 3 16M15 21V17.5C15 16.5 15.1 16.1 14.5 15.5C17.3 15.2 20 14.1 20 9.49995C19.9988 8.30492 19.5325 7.15726 18.7 6.29995C19.0905 5.26192 19.0545 4.11158 18.6 3.09995C18.6 3.09995 17.5 2.79995 15.1 4.39995C13.0672 3.87054 10.9328 3.87054 8.9 4.39995C6.5 2.79995 5.4 3.09995 5.4 3.09995C4.94548 4.11158 4.90953 5.26192 5.3 6.29995C4.46745 7.15726 4.00122 8.30492 4 9.49995C4 14.1 6.7 15.2 9.5 15.5C8.9 16.1 8.9 16.7 9 17.5V21',
          },
        },
      ],
    },
    props
  )
}

export function Instagram(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            d: 'M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z',
          },
        },
        {
          tag: 'path',
          attr: {
            stroke: 'currentColor',
            d: 'M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z',
          },
        },
      ],
    },
    props
  )
}

export function Linkedin(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: {
            d: 'M8 11V16M8 8V8.01M12 16V11M16 16V13C16 12.4696 15.7893 11.9609 15.4142 11.5858C15.0391 11.2107 14.5304 11 14 11C13.4696 11 12.9609 11.2107 12.5858 11.5858C12.2107 11.9609 12 12.4696 12 13M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z',
          },
        },
      ],
    },
    props
  )
}

export function Twitter(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' },
        },
        {
          tag: 'path',
          attr: {
            d: 'M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z',
          },
        },
      ],
    },
    props
  )
}

export function Pencil(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' },
        },
        {
          tag: 'path',
          attr: {
            d: 'M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4',
          },
        },
        {
          tag: 'line',
          attr: { x1: '13.5', y1: '6.5', x2: '17.5', y2: '10.5' },
        },
      ],
    },
    props
  )
}

export function Trash(props) {
  return GenerateIcon(
    {
      tag: 'svg',
      attr: {
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: '2',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
      child: [
        {
          tag: 'path',
          attr: { stroke: 'none', d: 'M0 0h24v24H0z', fill: 'none' },
        },
        {
          tag: 'line',
          attr: { x1: '4', y1: '7', x2: '20', y2: '7' },
        },
        {
          tag: 'line',
          attr: { x1: '10', y1: '11', x2: '10', y2: '17' },
        },
        {
          tag: 'line',
          attr: { x1: '14', y1: '11', x2: '14', y2: '17' },
        },
        {
          tag: 'path',
          attr: {
            d: 'M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12',
          },
        },
        {
          tag: 'path',
          attr: {
            d: 'M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3',
          },
        },
      ],
    },
    props
  )
}
