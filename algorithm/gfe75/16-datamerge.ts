type Session = { user: number; duration: number; equipment: Array<string> };

export default function mergeData(sessions: Array<Session>): Array<Session> {
  const map = new Map<number, Session>();

  for (const session of sessions) {
    const id = session.user;
    if (!map.has(id)) {
      map.set(id, { ...session });
      continue;
    }
    const temp = map.get(id);
    temp.duration += session.duration;
    temp.equipment = temp.equipment.concat(session.equipment);
    console.log(temp, session);
  }
  const results = [];
  for (const element of Array.from(map.values())) {
    const set = new Set(element.equipment.sort());
    results.push({ ...element, equipment: Array.from(set) });
  }

  return results;
}

// const sessions = [
//   { user: 8, duration: 50, equipment: ["bench"] },
//   { user: 7, duration: 150, equipment: ["dumbbell"] },
//   // { user: 1, duration: 10, equipment: ["barbell"] },
//   // { user: 7, duration: 100, equipment: ["bike", "kettlebell"] },
//   // { user: 7, duration: 200, equipment: ["bike"] },
//   // { user: 2, duration: 200, equipment: ["treadmill"] },
//   // { user: 2, duration: 200, equipment: ["bike"] },
// ];

// console.log(mergeData(sessions));
// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 7, duration: 450, equipment: ['bike', 'dumbbell', 'kettlebell'] },
//   { user: 1, duration: 10, equipment: ['barbell'] },
//   { user: 2, duration: 400, equipment: ['bike', 'treadmill'] },
// ];
const temp = mergeData([
  { user: 8, duration: 50, equipment: ["bench"] },
  { user: 7, duration: 150, equipment: ["dumbbell", "kettlebell"] },
  { user: 8, duration: 50, equipment: ["bench"] },
  { user: 7, duration: 150, equipment: ["bench", "kettlebell"] },
]);
console.log(temp);
