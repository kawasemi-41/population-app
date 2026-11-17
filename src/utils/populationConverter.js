const PREFECTURES = [
  "東京都",
  "神奈川県",
  "埼玉県",
  "千葉県",
  "茨城県",
  "栃木県",
  "群馬県",
  "山梨県",
];

export function convertPopulationData(json) {
  const values =
    json.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE
        .filter(item => item["@cat01"] === "A1101");

  const classObjects =
    json.GET_STATS_DATA
      .STATISTICAL_DATA
      .CLASS_INF
      .CLASS_OBJ;

  const areaClass =
    classObjects.find(
      item => item["@id"] === "area"
    );

  const timeClass =
    classObjects.find(
      item => item["@id"] === "time"
    );

  const areaMap = {};
  const timeMap = {};

  areaClass.CLASS.forEach(item => {
    areaMap[item["@code"]] = item["@name"];
  });

  timeClass.CLASS.forEach(item => {
    timeMap[item["@code"]] =
      String(item["@name"]).slice(0, 4);
  });

  const tableData = {};

  values.forEach(item => {
    const prefecture =
      areaMap[item["@area"]];

    if (!PREFECTURES.includes(prefecture)) {
      return;
    }

    const year =
      timeMap[item["@time"]] ||
      String(item["@time"]).slice(0, 4);

    if (!tableData[year]) {
      tableData[year] = {};
    }

    tableData[year][prefecture] =
      Number(item["$"]);
  });

  const years =
    Object.keys(tableData)
      .sort(
        (a, b) => Number(b) - Number(a)
      );

  return {
    years,
    tableData,
  };
}