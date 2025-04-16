//             19
//            /  \
//    1 --- 2  --  3 ---- 4
//  / | \ / | \ /  | \  / |  \
// 5--6--7--8--9--10--11--12--13
//  \ | / \ | /  \ | /  \ | /
//   14 -- 15 --- 16 --- 17
//      \   |   /
//         18
//  1 倒钩街        barb
//  2 峭壁街        cliff
//  3 海星街        starfish
//  4 梅尔街        mer
//  5 宅邸街        domus
//  6 住宅区小巷    residential
//  7 康达努斯街    connudatus
//  8 商业街小巷    commercial
//  9 商业街        high
// 10 公园          park
// 11 牛津街        oxford
// 12 工业区小巷    industrial
// 13 丰收街        harvest
// 14 多瑙河街      danube
// 15 狼街          wolf
// 16 南丁格尔街    nightingale
// 17 麋鹿街        elk
// 18 森林                          forest
// 19 海滩                          beach

// const args = process.argv.slice(2);
// if (args.length < 3) {
//   console.log("Usage: node test.js <start> <end> <minSteps>");
//   process.exit(1);
// }
// const start = parseInt(args[0]);
// const end = parseInt(args[1]);
// const minSteps = parseInt(args[2]);
// console.log(start, end, minSteps)

// 计算最短路径步数（不含起点）
function bfsShortestCummilk(graph, start, end) {
  let queue = [[start]];
  let visited = new Set([start]);
  while (queue.length) {
    let path = queue.shift();
    let curr = path[path.length - 1];
    if (curr === end) {
      return path.length - 1;
    }
    for (let next of graph[curr] || []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([...path, next]);
      }
    }
  }
  return Infinity;
}

// 打乱数组顺序
function shuffleCummilk(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * 寻路函数
 * @param {number|string} start 起点
 * @param {number|string} end 终点
 * @param {number} minSteps 要求的最小步数（实际路径步数可能会略多，但不会超过 max(最短路径, minSteps) + extra）
 * @param {number} extra 额外允许的步数（默认 2）
 * @returns {Array} 符合条件的节点路径数组
 */
function findPathCummilk(start, end, minSteps, extra = 2) {
    let graph = {
        1:[2,5,6,7],
        2:[1,3,7,8,9,19],
        3:[2,4,9,10,11,19],
        4:[3,11,13,13],
        5:[1,6,14],
        6:[1,5,7,14,8],
        7:[1,2,6,8,14,15],
        8:[2,7,9,15,6,10],
        9:[2,3,8,10,15,16],
        10:[3,9,11,16,8,12],
        11:[3,4,10,12,16,17],
        12:[4,11,13,17,10],
        13:[4,12,17],
        14:[5,6,7,15,18],
        15:[7,8,9,14,16,18],
        16:[9,10,11,15,17,18],
        17:[11,12,13,16],
        18:[14,15,16],
        19:[2,3],
    };
  // 先计算最短路径步数
  let shortest = bfsShortestCummilk(graph, start, end);
  // 设定搜索上限：不超过 max(最短路径, minSteps) + extra 步
  const maxAllowed = Math.max(shortest, minSteps) + extra;

  let result = null;
  function dfs(path) {
    const curr = path[path.length - 1];

    // 达到终点且步数不少于 minSteps
    if (curr === end && (path.length - 1) >= minSteps) {
      result = path.slice();
      return true;
    }
    // 限制路径长度不超过 maxAllowed
    if (path.length - 1 >= maxAllowed) return false;

    // 随机打乱当前节点可前往的节点顺序
    for (let next of shuffleCummilk([...graph[curr] || []])) {
      // 防止在两个节点间来回徘徊
      if (path.length >= 2 && next === path[path.length - 2]) continue;
      path.push(next);
      if (dfs(path)) return true;
      path.pop();
    }
    return false;
  }
  dfs([start]);
  return result;
}
window.findPathCummilk = findPathCummilk;

function cummilkGetStreeName(num) {
  const names = [
    "", "倒钩街", "峭壁街", "海星街", "梅尔街", "宅邸街", "住宅区小巷",
    "康达努斯街", "商业街小巷", "商业街", "公园", "牛津街", "工业区小巷",
    "丰收街", "多瑙河街", "狼街", "南丁格尔街", "麋鹿街", "森林", "海滩"
  ];
  return names[num] || "";
}
window.cummilkGetStreeName = cummilkGetStreeName;

// console.log("路径:", findPathCummilk(start, end, minSteps));
