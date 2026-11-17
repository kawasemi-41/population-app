function calcScore(
  assign,
  prefectures,
  scores
) {
  let total = 0;

  for (
    let i = 0;
    i < prefectures.length;
    i++
  ) {
    for (
      let j = i + 1;
      j < prefectures.length;
      j++
    ) {
      if (
        assign[i] ===
        assign[j]
      ) {
        const a =
          prefectures[i];

        const b =
          prefectures[j];

        total +=
          scores[a]?.[
            b
          ] ?? 0;
      }
    }
  }

  return total;
}
function calcGroupScore(
  group,
  scores
) {
  let total = 0;

  for (
    let i = 0;
    i < group.length;
    i++
  ) {
    for (
      let j = i + 1;
      j < group.length;
      j++
    ) {
      const a = group[i];
      const b = group[j];

      total +=
        scores[a]?.[b] ?? 0;
    }
  }

  return total;
}
function getGroupDetails(
  group,
  scores
) {
  const details = [];

  for (
    let i = 0;
    i < group.length;
    i++
  ) {
    for (
      let j = i + 1;
      j < group.length;
      j++
    ) {
      const a = group[i];
      const b = group[j];

      details.push({
        from: a,
        to: b,
        score:
          scores[a]?.[b] ?? 0,
      });
    }
  }

  return details;
}
export function findBestGrouping(
  prefectures,
  scores
) {
  const n =
    prefectures.length;

  let bestScore =
    Number.MIN_SAFE_INTEGER;

  let bestAssign =
    null;

  const assign =
    new Array(n).fill(0);

  function dfs(
    index,
    maxGroup
  ) {
    if (index === n) {
      const score =
        calcScore(
          assign,
          prefectures,
          scores
        );

      if (
        score >
        bestScore
      ) {
        bestScore =
          score;

        bestAssign =
          [...assign];
      }

      return;
    }

    for (
      let group = 0;
      group <=
      Math.min(
        maxGroup + 1,
        2
      );
      group++
    ) {
      assign[index] =
        group;

      dfs(
        index + 1,
        Math.max(
          maxGroup,
          group
        )
      );
    }
  }

  assign[0] = 0;

  dfs(1, 0);

  const groupsMap =
    {};

  bestAssign.forEach(
    (
      groupNo,
      index
    ) => {
      if (
        !groupsMap[
          groupNo
        ]
      ) {
        groupsMap[
          groupNo
        ] = [];
      }

      groupsMap[
        groupNo
      ].push(
        prefectures[
          index
        ]
      );
    }
  );
  const groups =
    Object.values(groupsMap);
  const groupScores =
    groups.map((group) =>
        calcGroupScore(
        group,
        scores
        )
    );
const groupDetails =
  groups.map((group) =>
    getGroupDetails(
      group,
      scores
    )
  );
  return {
    score: bestScore,
    groups,
    groupScores,
    groupDetails,
  };
}