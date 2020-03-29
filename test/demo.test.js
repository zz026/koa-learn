/**
 * @description 测试demo
 * @author zzw
 */

function sum (a, b) {
  return a + b
}

test('10 + 20 === 30', () => {
  const res = sum (10, 20)
  expect(res).toBe(30) // 期望等于30
})

test('10 + 20 !== 40', () => {
  const res = sum (10, 20)
   expect(res).not.toBe(40) // 期望不等于40
})