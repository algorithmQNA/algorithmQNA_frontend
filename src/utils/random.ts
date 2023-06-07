export function generateRandomDate() {
  const start = new Date(2023, 1, 1);
  const end = new Date();
  const generatedDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return generatedDate.toISOString();
}

export function generateRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

/**랜덤 스트링 생성기*/
export const generateRandomString = (max = 11) =>
  Math.random()
    .toString(36)
    .substring(2, 11)
    .repeat(max / 11);
