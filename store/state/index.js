export default {
  accessToken:'default Token String', // 토큰에러가 발생 -> 페이지 새로고침
  realmSlugList:['default'],
  characterName:'',
  realmSlug:'',
  characterProfile:{},
  characterMedia:{},
  dungeonImageData:{},
  hasRaidProgressData:false,
  hasDungeonImage: false,
  dungeonIdList: [741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754,
    755, 756, 759, 757, 760, 758, 761, 75, 73, 72, 74, 78, 187, 317, 330, 320, 362, 369, 477, 457, 669, 768,
    861, 786, 875, 946, 1031, 1176, 1177, 1179, 1180,1190],
  raidProgressData: [],
  characterGearSlot: [
    {
      gearType:'HEAD'
    },
    {
      gearType:'NECK'
    },
    {
      gearType:'SHOULDER'
    },
    {
      gearType:'SHIRT'
    },
    {
      gearType:'CHEST'
    },
    {
      gearType:'WAIST'
    },
    {
      gearType:'LEGS'
    },
    {
      gearType:'FEET'
    },
    {
      gearType:'WRIST'
    },
    {
      gearType:'HANDS'
    },
    {
      gearType:'FINGER_1'
    },
    {
      gearType:'FINGER_2'
    },
    {
      gearType:'TRINKET_1'
    },
    {
      gearType:'TRINKET_2'
    },
    {
      gearType:'BACK'
    },
    {
      gearType:'MAIN_HAND'
    },
    {
      gearType:'OFF_HAND'
    },
    {
      gearType:'TABARD'
    },
  ],
  gearImage:{},
  itemQualityRGBA : {
    POOR: [157, 157, 157, 255],
    COMMON: [255, 255, 255, 255],
    UNCOMMON: [30, 255, 0, 255],
    RARE: [0, 112, 221, 255],
    EPIC: [163, 53, 238, 255],
    LEGENDARY: [255, 128, 0, 255],
    ARTIFACT: [230, 204, 128, 255],
    HEIRLOOM: [0, 204, 255, 255]
  }
}
