export const getCircleStyles = (value: number, maxValue: number) => {
  const radius = 10 + (value / maxValue) * 30; // Adjust the size based on the value (20-100px)
  const heatValue = ((value - 255) / (maxValue - 255)) * 100; // Calculate the heat value (0-100)

  const gradient = [
    { color: '#ff0000', position: 0 }, // Red (hot)
    { color: '#bfff00', position: 50 }, // Yellow Green
    { color: '#0000ff', position: 100 }, // Dark blue (cold)
  ];

  const adjustedGradient = gradient.map(({ color, position }) => ({
    color,
    position: position * (heatValue / 100),
  }));

  const gradientString = adjustedGradient
    .map(({ color, position }) => `${color} ${position}%`)
    .join(', ');

  console.log(gradientString);

  return {
    width: `${radius}px`,
    height: `${radius}px`,
    background: `radial-gradient(circle at center, ${gradientString})`,
  };
};
