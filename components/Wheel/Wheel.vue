<template>
  <div>
    <div
      id="wheel__container"
      class="relative flex justify-center items-center"
    >
      <div class="absolute -top-7">
        <v-img src="/wheel_arrow.png" width="67" />
      </div>

      <svg id="wheel" width="347" height="347"></svg>

      <button
        class="play-btn"
        @click="spin"
        :disabled="isDisabled"
        :class="{ 'opacity-80': isDisabled }"
      >
        PLAY
      </button>
    </div>

    <v-dialog v-model="isShowCongrats">
      <WheelCongratsModal
        :data="wonPrize"
        @update:visible="isShowCongrats = false"
      />
    </v-dialog>

    <v-dialog v-model="isShowUnlucky">
      <WheelUnluckyModal @update:visible="isShowUnlucky = false" />
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import type { PieData } from "./types";
import music from "~/utils/music";

const width = 347;
const height = width;
const radius = width / 2;
const spinDuration = 3000; // ms

const { saveGameRecord } = useGameStore();
const { data } = await useFetch<PieData[]>("/api/wheel");
const segments = data.value || [];

const remainingSpin = ref(3);
const isDisabled = ref(false);
const svgRef = ref<any>();
const wonPrize = ref<PieData>();
const isShowCongrats = ref(false);
const isShowUnlucky = ref(false);

onMounted(() => {
  svgRef.value = renderWheel();
});

function spin() {
  if (remainingSpin.value === 0) {
    alert("You have no ticket left, please refresh the page");
    return null;
  }

  music.spinning.play();
  isDisabled.value = true;

  const spins = 3;
  const degrees = spins * 360;
  const piedegree = 360 / segments.length;
  const randomPieMovement = randomInt(1, piedegree);
  const segmentIndex = Math.floor(Math.random() * (segments.length - 1));
  const rotation =
    (segments.length - segmentIndex) * piedegree - randomPieMovement + degrees;

  function rotTween() {
    const i = d3.interpolate(0, rotation);

    return function (t: number) {
      return `translate(${width / 2}, ${height / 2}) rotate(${i(t)})`;
    };
  }

  svgRef.value
    .transition()
    .duration(spinDuration)
    .attrTween("transform", rotTween)
    .ease(d3.easeCircleOut)
    .on("end", () => {
      if (segments[segmentIndex].isUnlucky) {
        isShowUnlucky.value = true;
      } else {
        music.winning.play();
        wonPrize.value = segments[segmentIndex];
        saveGameRecord(segments[segmentIndex].value);
        isShowCongrats.value = true;
      }

      isDisabled.value = false;
      remainingSpin.value -= 1;
    });
}

function renderWheel() {
  // create SVG with stroke, hardcode stroke's color for this challenge
  const svg = d3
    .select("#wheel")
    .attr("stroke", "var(--primary-color)")
    .attr("stroke-width", 2)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const labelRadius = radius / 2 + 37;
  const imageSize = 35;
  const imageRadius = radius / 2 - 5;

  const pie = d3.pie<PieData>().sort(null).value(1);
  const arc = createArc(radius - 18, 50);
  const arcLabel = createArc(labelRadius, labelRadius);
  const arcImage = createArc(imageRadius, imageRadius);

  const arcs = svg
    .selectAll("arc")
    .data(pie(segments))
    .enter()
    .append("g")
    .attr("class", "arc");

  function createBorder(
    radius: number,
    color: string,
    width: number,
    opacity: number,
  ) {
    svg
      .append("circle")
      .attr("r", radius)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", width)
      .style("opacity", opacity);
  }

  function createArc(outerRadius: number, innerRadius: number) {
    return d3
      .arc<d3.PieArcDatum<PieData>>()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);
  }

  // prepare the linear gradient background
  svg
    .append("defs")
    .selectAll("pattern")
    .data(segments)
    .enter()
    .append("linearGradient")
    .attr("id", (_, i) => `color-${i}`)
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .selectAll("stop")
    .data((d) => [
      { offset: "0%", color: d.startColor },
      { offset: "100%", color: d.stopColor },
    ])
    .enter()
    .append("stop")
    .attr("offset", (d) => d.offset)
    .attr("style", (d) => `stop-color:${d.color};stop-opacity:1`);

  // fill the linear gradient color to correct path
  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (_, i) => `url(#color-${i})`);

  // fill prize text
  arcs
    .append("text")
    .attr("transform", (d) => {
      // angle to degrees
      const degrees = (d.endAngle * 180) / Math.PI;
      return `translate(${arcLabel.centroid(d)}) rotate(${degrees - 20})`;
    })
    // fill `prize` top line, ignore special segments have no name
    .text((d) => (d.data.name && !d.data.isUnlucky ? "prize" : ""))
    .attr(
      "style",
      "text-anchor: middle; text-transform: uppercase; stroke: white; stroke-width: 0.5; fill: white;",
    )
    .append("tspan")
    .attr("x", 0)
    .attr("y", "1.25em")
    .text((d) => d.data.name);

  // draw images
  arcs
    .append("g")
    .attr("transform", (d) => `translate(${arcImage.centroid(d)})`)
    .append("svg:image")
    .attr("xlink:href", (d) => d.data.image || "")
    .attr("width", imageSize)
    .attr("height", imageSize)
    .attr("x", (-1 * imageSize) / 2)
    .attr("y", (-1 * imageSize) / 2);

  // Draw borders
  createBorder(radius - 15, "var(--secondary-color)", 4, 1);
  createBorder(radius - 9, "var(--primary-color)", 9, 1);
  createBorder(radius - 23, "var(--primary-color)", 12, 0.4);
  createBorder(55, "var(--primary-color)", 12, 0.4);

  return svg;
}
</script>

<style scoped>
.play-btn {
  width: 100px;
  height: 100px;
  background: radial-gradient(
      closest-side,
      var(--secondary-color),
      var(--primary-color)
    ),
    radial-gradient(circle at 100%, #fff, var(--primary-color));

  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
  @apply text-2xl font-bold text-white rounded-full;
}

.play-btn::after {
  content: "";
  width: 100%;
  height: 100%;
  line-height: 100px;
  background: radial-gradient(
    circle at 100%,
    transparent,
    transparent,
    transparent,
    transparent,
    transparent,
    #fff
  );
  @apply absolute top-0 left-0 rounded-full;
}

.play-btn::before {
  content: "";
  width: 100%;
  height: 100%;
  line-height: 100px;
  background: radial-gradient(
    circle at 100%,
    transparent,
    transparent,
    transparent,
    transparent,
    transparent,
    #fff
  );

  @apply absolute top-0 right-0 rounded-full z-50 -scale-100;
}
</style>
