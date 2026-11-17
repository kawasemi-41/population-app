export async function getPopulationData() {
  const params = new URLSearchParams(window.location.search);

  const appId = params.get("appId");

  if (!appId) {
    throw new Error(
      "appIdが指定されていません。URLに ?appId=XXXXX を指定してください。"
    );
  }

const url =
    `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData` +
    `?appId=${appId}` +
    `&lang=J` +
    `&statsDataId=0000010101` +
    `&cdArea=08000,09000,10000,11000,12000,13000,14000,19000` +
    `&cdCat01=A1101` +
    `&metaGetFlg=Y` +
    `&cntGetFlg=N` +
    `&explanationGetFlg=Y` +
    `&annotationGetFlg=Y` +
    `&sectionHeaderFlg=1` +
    `&replaceSpChars=0`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("統計データの取得に失敗しました。");
  }

  return await response.json();
}