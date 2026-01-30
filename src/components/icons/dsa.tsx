import { SVGProps } from 'react';

export function DsaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14" {...props}>
      {/* Icon from Streamline color by Streamline - https://creativecommons.org/licenses/by/4.0/ */}
      <title>DSA</title>
      <g fill="none">
        <path
          fill="#d7e0ff"
          fillRule="evenodd"
          d="M.65 8.074v3.62l3.167 1.357l3.167-1.357l3.166 1.357l3.167-1.357v-3.62l-.008-.003l-3.159 1.353l-3.166-1.357l3.166-1.35l.002-3.621l-.002.026L6.983 4.48L3.82 3.123l-.002 3.594l3.167 1.35l-3.167 1.359z"
          clipRule="evenodd"
        />
        <path
          fill="#fff"
          d="m6.985 1.738l3.167 1.357l-.002.027l-3.167 1.357l-3.166-1.357l.002-.027zm3.165 4.979l3.158 1.354l-3.158 1.353l-3.166-1.357l-3.167 1.359L.65 8.074l3.167-1.357l3.167 1.35z"
        />
        <path
          stroke="#4147d5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m.65 8.067l3.167 1.357l3.167-1.357M3.817 3.122l3.166 1.357l3.167-1.357"
        />
        <path
          stroke="#4147d5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m6.983 8.067l3.167 1.357l3.167-1.357M.65 11.694v-3.62l3.167-1.357l3.167 1.357v3.62L3.817 13.05z"
        />
        <path
          stroke="#4147d5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.819 6.715v-3.62l3.166-1.357l3.167 1.357v3.62L6.985 8.072zm3.164 4.979v-3.62l3.167-1.357l3.167 1.357v3.62L10.15 13.05zM3.817 9.426v3.625m6.335-3.625v3.625M6.983 4.48v3.624"
        />
      </g>
    </svg>
  );
}
