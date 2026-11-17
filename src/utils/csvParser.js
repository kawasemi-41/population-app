export function parseCsv(text) {
  const rows = text
    .trim()
    .split("\n")
    .map((row) =>
      row.replace(/\r/g, "")
    );

  const headers =
    rows[0].split(",");

  const prefectures =
    headers.slice(1);

  const scores = {};

  prefectures.forEach(
    (pref) => {
      scores[pref] = {};
    }
  );

  for (
    let rowIndex = 1;
    rowIndex < rows.length;
    rowIndex++
  ) {
    const cols =
      rows[rowIndex].split(
        ","
      );

    const from =
      cols[0];

    for (
      let colIndex = 1;
      colIndex < cols.length;
      colIndex++
    ) {
      const to =
        headers[colIndex];

      const value =
        cols[
          colIndex
        ].trim();

      if (
        value === "-"
      ) {
        continue;
      }

      const score =
        Number(value);

      scores[from][to] =
        score;

      scores[to][from] =
        score;
    }
  }

  return {
    prefectures,
    scores,
  };
}