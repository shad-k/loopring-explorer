import LRUCache from "../utils/cache";

test("Cache methods work", () => {
  const cache = new LRUCache();

  cache.set("1", "2");
  cache.set("3", "4");
  expect(cache.size).toEqual(2);
  expect(cache.get("1")).toEqual("2");

  cache.remove("3");
  expect(cache.size).toEqual(1);
});
