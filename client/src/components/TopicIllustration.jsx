const categoryClasses = {
  Nature: 'nature',
  Science: 'science',
  Technology: 'technology',
  History: 'history',
  Psychology: 'psychology',
  Space: 'space',
  'Art & Culture': 'culture'
};

function NatureArt() {
  return (
    <g className="vector-nature">
      <path className="vector-ground" d="M24 148h152" />
      <path className="vector-trunk" d="M100 146c-3-24-2-45 0-68m0 36c-11-16-22-23-37-28m38 12c12-19 24-28 41-34" />
      <path className="vector-leaf" d="M64 85c-1-18 17-28 34-24-1 16-14 28-34 24Zm38-12c-4-18 9-33 27-32 4 17-7 31-27 32Zm-13 30c-19-4-27 10-25 26 17 2 28-10 25-26Zm18-17c14-15 32-12 40 2-10 14-27 15-40-2Z" />
      <path className="vector-detail" d="M67 83 92 64m11 7 15-25M67 126l22-22m20-18 35-2" />
      <circle className="vector-spark" cx="47" cy="51" r="3" />
      <circle className="vector-spark" cx="157" cy="57" r="2" />
    </g>
  );
}

function ScienceArt() {
  return (
    <g className="vector-science">
      <ellipse className="vector-orbit" cx="100" cy="96" rx="62" ry="25" transform="rotate(-32 100 96)" />
      <ellipse className="vector-orbit" cx="100" cy="96" rx="62" ry="25" transform="rotate(32 100 96)" />
      <ellipse className="vector-orbit" cx="100" cy="96" rx="62" ry="25" transform="rotate(90 100 96)" />
      <circle className="vector-nucleus" cx="100" cy="96" r="10" />
      <circle className="vector-electron" cx="48" cy="68" r="4" />
      <circle className="vector-electron" cx="153" cy="121" r="4" />
      <circle className="vector-electron" cx="99" cy="34" r="4" />
      <path className="vector-detail" d="M32 146h42m52 0h42M52 39l-8-8m102 20 9-8" />
    </g>
  );
}

function TechnologyArt() {
  return (
    <g className="vector-technology">
      <rect className="vector-chip" x="68" y="64" width="64" height="64" rx="12" />
      <rect className="vector-chip-inner" x="82" y="78" width="36" height="36" rx="6" />
      <path className="vector-circuit" d="M83 64V48H59V35m38 29V43m20 21V51h21V39m-55 89v15H66v10m36-36v21h19v12m11-49h15v-16h14M68 90H52V76H38m30 34H54v16H39m93-36h17v16h13" />
      <circle className="vector-node" cx="59" cy="35" r="3" />
      <circle className="vector-node" cx="140" cy="39" r="3" />
      <circle className="vector-node" cx="66" cy="160" r="3" />
      <circle className="vector-node" cx="162" cy="90" r="3" />
      <path className="vector-detail" d="m93 101 5 5 11-13" />
    </g>
  );
}

function HistoryArt() {
  return (
    <g className="vector-history">
      <path className="vector-architecture" d="M37 73 100 38l63 35H37Zm9 7h108M52 83v48m18-48v48m18-48v48m24-48v48m18-48v48m18-48v48m-98 5h96m-110 9h124" />
      <path className="vector-detail" d="M86 58c4-5 9-8 14-8s10 3 14 8M92 65h16" />
      <circle className="vector-spark" cx="42" cy="47" r="2" />
      <circle className="vector-spark" cx="158" cy="45" r="3" />
    </g>
  );
}

function PsychologyArt() {
  return (
    <g className="vector-psychology">
      <path className="vector-head" d="M111 142c-2-9-2-15 0-21 13-7 22-18 22-34 0-25-16-42-40-42S52 62 52 87c0 17 9 29 22 35v20h37Z" />
      <path className="vector-brain" d="M75 89c-9-7-6-20 4-23 0-12 15-16 21-7 9-6 21 2 18 12 10 5 7 19-1 22-1 10-12 15-20 9-9 8-22 2-22-8Z" />
      <path className="vector-neural" d="m78 77 13 4 9-12 11 13-10 10-12 1-7 8m18-20 14-2m-24 2-2 12" />
      <circle className="vector-node" cx="78" cy="77" r="3" />
      <circle className="vector-node" cx="91" cy="81" r="3" />
      <circle className="vector-node" cx="100" cy="69" r="3" />
      <circle className="vector-node" cx="111" cy="82" r="3" />
      <circle className="vector-node" cx="101" cy="92" r="3" />
      <path className="vector-detail" d="M88 142h26m-23 7h20" />
    </g>
  );
}

function SpaceArt() {
  return (
    <g className="vector-space">
      <circle className="vector-planet" cx="99" cy="91" r="34" />
      <path className="vector-planet-shade" d="M75 68c14-13 36-14 50-2-7 0-12 4-15 9-4 8-1 14 5 19 6 6 8 14 3 23-5 8-14 13-24 14-19-3-34-20-34-40 0-9 5-18 15-23Z" />
      <ellipse className="vector-orbit" cx="99" cy="91" rx="67" ry="23" transform="rotate(-18 99 91)" />
      <circle className="vector-spark" cx="40" cy="58" r="2" />
      <circle className="vector-spark" cx="155" cy="47" r="3" />
      <circle className="vector-spark" cx="150" cy="135" r="2" />
      <path className="vector-star" d="m55 122 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Zm88-69 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
    </g>
  );
}

function CultureArt() {
  return (
    <g className="vector-culture">
      <path className="vector-palette" d="M100 46c-34 0-59 23-59 53 0 27 20 49 48 49h10c9 0 14-8 10-16-4-7 1-14 9-14h8c15 0 25-12 25-27 0-26-22-45-51-45Z" />
      <circle className="vector-paint" cx="73" cy="88" r="5" />
      <circle className="vector-paint" cx="91" cy="72" r="5" />
      <circle className="vector-paint" cx="116" cy="74" r="5" />
      <circle className="vector-paint" cx="133" cy="94" r="5" />
      <path className="vector-brush" d="m120 133 25-30m-25 30 8 9m-8-9-9 2" />
      <path className="vector-detail" d="M55 120c12 9 21 13 33 14" />
      <circle className="vector-spark" cx="152" cy="54" r="3" />
    </g>
  );
}

const illustrations = {
  Nature: NatureArt,
  Science: ScienceArt,
  Technology: TechnologyArt,
  History: HistoryArt,
  Psychology: PsychologyArt,
  Space: SpaceArt,
  'Art & Culture': CultureArt
};

export default function TopicIllustration({ category, variant = 'card' }) {
  const Illustration = illustrations[category] || ScienceArt;
  const categoryClass = categoryClasses[category] || 'science';

  return (
    <svg
      className={`topic-illustration illustration-${variant} illustration-${categoryClass}`}
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <Illustration />
    </svg>
  );
}
