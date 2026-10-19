// Generated from the SkillId attached to each VLTK icon. Survival numbers are independent of VLTK learn levels.
export const VLTK_CATALOG = [
  {
    "id": "hoasonkiem",
    "name": "Kiếm Tông Tổng Quyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 1349,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1349
      ],
      "skillName": "Kiếm Tông Tổng Quyết",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "attackspeed_yan_v",
        "attackspeed_v",
        "manareplenish_v",
        "manareplenish_p",
        "lifemax_yan_p",
        "addcolddamage_v",
        "anti_hitrecover"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {
      "atkBonus": 0.04,
      "mpRegen": 1
    },
    "move": {},
    "desc": "Bị động: +4% sát thương, +1 nội lực/giây. Chỉ số tham khảo cho cách chơi khác; không dùng trong sinh tồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "lahan",
    "name": "Thiếu Lâm quyền pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 8,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        8
      ],
      "skillName": "Thiếu Lâm quyền pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "attackratingenhance_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": -1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {
      "atkBonus": 0.03
    },
    "move": {},
    "desc": "Bị động: +3% sát thương. Chỉ số tham khảo cho cách chơi khác; không dùng trong sinh tồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "toanchan",
    "name": "Nhân Kiếm Hợp Nhất",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 368,
      "missileId": 175,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        368
      ],
      "skillName": "Nhân Kiếm Hợp Nhất",
      "missileName": "人剑合一",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "attackrating_p",
        "stealmana_p",
        "deadlystrike_p",
        "lightingdamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_collideevent",
        "skill_startevent",
        "skill_showevent",
        "addskillexp1",
        "skill_skillexp_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "addskilldamage1"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 3,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 90,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 6
    },
    "pierce": true,
    "simplifications": [],
    "count": 3,
    "speed": 540,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "3 đạn đúng nguồn, tổng 250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 90px, đạn bay 120px (540px/giây), va chạm 32px (1 ô CollidRange). Hiệu ứng nguồn: hút 5% nội lực (×0,1 là luật Sinh tồn). Ngũ hành: nhánh con khi trúng: 20% choáng 0,556 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 120,
    "sourceReach": {
      "attackRadius": 90,
      "speedPerFrame": 30,
      "lifeFrames": 4,
      "reach": 120,
      "collidCells": 1
    },
    "drain": {
      "life": 0,
      "mana": 0.05
    },
    "branchEffects": {
      "371:20": {
        "event": "start",
        "stun": {
          "chance": 0.2,
          "dur": 0.556,
          "from": "371:20"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "batquai",
    "name": "Bá Vương Tạm Kim",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1060,
      "missileId": 350,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1060,
        1088
      ],
      "skillName": "Bá Vương Tạm Kim",
      "missileName": "霸王錾金子弹",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "attackrating_p",
        "deadlystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "ignoredefense_p",
        "skill_skillexp_v",
        "skill_misslenum_v"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 3,
      "form": 2,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "thuong",
    "survivalStatus": "playable",
    "dmg": 990,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 180,
    "radius": 65,
    "form": {
      "shape": 2,
      "generate": 3,
      "gap": 2
    },
    "pierce": true,
    "simplifications": [],
    "count": 3,
    "speed": 648,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "3 đạn đúng nguồn, tổng 990; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 180px, đạn bay 180px (648px/giây), va chạm 32px (1 ô CollidRange). Hiệu ứng nguồn: bỏ qua 99% giáp (loại phòng thủ chưa xác minh). Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "reach": 180,
    "sourceReach": {
      "attackRadius": 180,
      "speedPerFrame": 36,
      "lifeFrames": 5,
      "reach": 180,
      "collidCells": 1
    },
    "armorPierce": 0.99,
    "sourceNotes": []
  },
  {
    "id": "duonggia",
    "name": "Truy Tinh Trục Nguyệt",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 323,
      "missileId": 139,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        323,
        327
      ],
      "skillName": "Truy Tinh Trục Nguyệt",
      "missileName": "追星逐月",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "attackrating_p",
        "deadlystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "addskillexp1",
        "skill_skillexp_v",
        "addskilldamage1",
        "addskilldamage2"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {
        "AnimFile2": "missing-in-client"
      }
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 3,
    "weaponAny": false,
    "weapon": "thuong",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 90,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 1
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 540,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "1 đạn đúng nguồn, tổng 250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 90px, đạn bay 120px (540px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 2 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 120,
    "sourceReach": {
      "attackRadius": 90,
      "speedPerFrame": 30,
      "lifeFrames": 4,
      "reach": 120,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "thatthuong",
    "name": "Thất Thương Thần Quyền",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 192,
      "missileId": 82,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        192
      ],
      "skillName": "Thất Thương Thần Quyền",
      "missileName": "七伤神拳伤害",
      "match": "exact",
      "style": 0,
      "attrs": [],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 8,
      "form": 3,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 50,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "bangphach",
    "name": "Băng Phách Hàn Quang",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 57,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        57
      ],
      "skillName": "Băng Phách Hàn Quang",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "addcolddamage_v",
        "skill_cost_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 50,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "mieugia",
    "name": "Phá Thiên Trảm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 322,
      "missileId": 138,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        322,
        326
      ],
      "skillName": "Phá Thiên Trảm",
      "missileName": "破天斩",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "seriesdamage_p",
        "deadlystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "addskillexp1",
        "skill_skillexp_v",
        "missle_lifetime_v",
        "attackrating_p",
        "addskilldamage1",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 3,
      "form": 0,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 750,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 90,
    "radius": 65,
    "form": {
      "shape": 0,
      "generate": 5,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 3,
    "speed": 540,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "3 đạn đúng nguồn, tổng 750; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 90px, đạn bay 120px (540px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 120,
    "sourceReach": {
      "attackRadius": 90,
      "speedPerFrame": 30,
      "lifeFrames": 4,
      "reach": 120,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "ngocnu",
    "name": "Kiếm Hoa Vãn Tinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1061,
      "missileId": 323,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1061
      ],
      "skillName": "Kiếm Hoa Vãn Tinh",
      "missileName": "流风回雪",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "colddamage_v",
        "deadlystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_startevent",
        "skill_showevent",
        "skill_skillexp_v",
        "seriesdamage_p"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 5,
      "form": 0,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 2,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 1650,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 0,
      "generate": 5,
      "gap": 2
    },
    "pierce": true,
    "simplifications": [],
    "count": 5,
    "speed": 648,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "5 đạn đúng nguồn, tổng 1650; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 576px (648px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát; băng sát. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "reach": 576,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 36,
      "lifeFrames": 16,
      "reach": 576,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1061:27",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "1089:20": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "1089:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      },
      "1091:1": {
        "event": "vanished",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "1091:1",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "huyetdao",
    "name": "Huyết Đao Độc Sát",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 65,
      "missileId": 31,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        65
      ],
      "skillName": "Huyết Đao Độc Sát",
      "missileName": "血手毒杀",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "poisondamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 384px, đạn bay 384px (432px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: trúng độc 32 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 384,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 16,
      "reach": 384,
      "collidCells": 1
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 32,
      "from": "65:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "nhatduong",
    "name": "Đơn Chỉ Liệt Diệm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 145,
      "missileId": 57,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        145
      ],
      "skillName": "Đơn Chỉ Liệt Diệm",
      "missileName": "弹指烈焰",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 96,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 384px, đạn bay 384px (432px/giây), va chạm 96px (3 ô CollidRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 384,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 16,
      "reach": 384,
      "collidCells": 3
    },
    "sourceNotes": []
  },
  {
    "id": "thienson",
    "name": "Thiên Phật Thiên Diệp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 330,
      "missileId": 145,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        330
      ],
      "skillName": "Thiên Phật Thiên Diệp",
      "missileName": "千佛千叶",
      "match": "exact",
      "style": 0,
      "attrs": [
        "colddamage_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_startevent",
        "skill_showevent",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 32,
      "form": 3,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 640,
    "mp": 22,
    "cd": 7.5,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 3,
      "generate": 5,
      "gap": 1
    },
    "pierce": false,
    "simplifications": [],
    "count": 32,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": true,
    "capPerVictim": 220,
    "desc": "32 đạn đúng nguồn, tổng 640; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 384px (432px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát; băng sát. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 384,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 24,
      "lifeFrames": 16,
      "reach": 384,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "330:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "380:20": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "380:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      },
      "331:20": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "331:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "hanbangmien",
    "name": "Băng Tước Hoạt Kỳ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1063,
      "missileId": 326,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1063
      ],
      "skillName": "Băng Tước Hoạt Kỳ",
      "missileName": "冰雀乱雪",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "colddamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_collideevent",
        "skill_showevent",
        "skill_misslenum_v",
        "skill_skillexp_v",
        "seriesdamage_p"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 3,
      "form": 2,
      "moveKind": 1,
      "height": 15,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 990,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 2,
      "generate": 0,
      "gap": 1
    },
    "pierce": false,
    "simplifications": [],
    "count": 3,
    "speed": 666,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "3 đạn đúng nguồn, tổng 990; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 703px (666px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "reach": 703,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 37,
      "lifeFrames": 19,
      "reach": 703,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1063:27",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "1064:20": {
        "event": "collide",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "1064:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "hogia",
    "name": "Trấn Biên Thùy",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 1967,
      "missileId": 527,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1967
      ],
      "skillName": "Trấn Biên Thùy",
      "missileName": "镇边陲",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "physicsenhance_p",
        "deadlystrike_p",
        "firedamage_v",
        "addskillexp1",
        "skill_skillexp_v",
        "addskilldamage1",
        "skill_cost_v"
      ],
      "equipment": 8,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 90,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "kimxa",
    "name": "Giang Hải Nộ Lan",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1075,
      "missileId": 337,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1075
      ],
      "skillName": "Giang Hải Nộ Lan",
      "missileName": "江海怒澜",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "firedamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "deadlystrike_p",
        "skill_skillexp_v",
        "skill_desc",
        "seriesdamage_p",
        "steallife_p",
        "stealmana_p",
        "skill_misslenum_v"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "missing-in-client",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 2,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "thuong",
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 198,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 4
    },
    "pierce": true,
    "simplifications": [],
    "count": 2,
    "speed": 720,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "2 đạn đúng nguồn, tổng 330; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 198px, đạn bay 240px (720px/giây), va chạm 32px (1 ô CollidRange). Hiệu ứng nguồn: hút 24% sinh lực, hút 24% nội lực (×0,1 là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 240,
    "sourceReach": {
      "attackRadius": 198,
      "speedPerFrame": 40,
      "lifeFrames": 6,
      "reach": 240,
      "collidCells": 1
    },
    "drain": {
      "life": 0.24,
      "mana": 0.24
    },
    "sourceNotes": []
  },
  {
    "id": "thaicuc",
    "name": "Thái Cực Vô ý",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 366,
      "missileId": 174,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        366
      ],
      "skillName": "Thái Cực Vô ý",
      "missileName": "天地无极眩晕",
      "match": "exact",
      "style": 0,
      "attrs": [
        "stun_p",
        "skill_eventskilllevel",
        "skill_vanishedevent",
        "skill_showevent",
        "seriesdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 15,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 470,
    "radius": 128,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.667,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 470px, bán kính 128px (4 ô DmgRange). Không giới hạn binh khí. Hiệu ứng nguồn: 20% làm choáng 0,556 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 470,
      "cells": 4,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "stun": {
      "chance": 0.2,
      "dur": 0.556,
      "from": "366:20"
    },
    "sourceNotes": []
  },
  {
    "id": "haptinh",
    "name": "Hấp Tinh Yểm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 711,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        711
      ],
      "skillName": "Hấp Tinh Yểm",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "autoattackskill",
        "skill_desc",
        "skill_skillexp_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "tichta",
    "name": "Thập Bộ Nhất Sát",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 2129,
      "missileId": 642,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2129
      ],
      "skillName": "Thập Bộ Nhất Sát",
      "missileName": "十步一杀",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "seriesdamage_p",
        "lightingdamage_v",
        "deadlystrike_p",
        "stun_p",
        "cost_sp",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_desc",
        "skill_skillexp_v",
        "missle_hitcount"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "resource-logic-pending",
        "text": "Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn."
      }
    ],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "pending",
    "desc": "Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn."
  },
  {
    "id": "dacau",
    "name": "Đả Cẩu bổng",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 124,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        124
      ],
      "skillName": "Đả Cẩu bổng",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "lifemax_yan_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {
      "atkBonus": 0.08,
      "hpMax": 60
    },
    "move": {},
    "desc": "Bị động: +8% sát thương, +60 sinh lực tối đa. Chỉ số tham khảo cho cách chơi khác; không dùng trong sinh tồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "bachcot",
    "name": "Âm Phong Thực Cốt",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 353,
      "missileId": 163,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        353
      ],
      "skillName": "Âm Phong Thực Cốt",
      "missileName": "阴风蚀骨",
      "match": "exact",
      "style": 0,
      "attrs": [
        "poisondamage_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "addskilldamage1",
        "skill_vanishedevent",
        "skill_showevent",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 20,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 27,
    "cd": 9,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 480,
    "radius": 96,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.722,
      "every": 0.667,
      "pulses": 2,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 0.722 giây, gây sát thương mỗi 0.667 giây (2 nhịp); một người nhận tối đa 250 sát thương gốc. Tầm nguồn: đặt xa 480px, bán kính 96px (3 ô DmgRange). Không giới hạn binh khí. Ngũ hành: trúng độc 50 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn); nhánh con khi trúng: trúng độc. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 480,
      "cells": 3,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 50,
      "from": "353:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "branchEffects": {
      "354:20": {
        "event": "vanished",
        "poison": {
          "dur": 3.333,
          "every": 0.556,
          "ticks": 6,
          "total": 50,
          "from": "354:20",
          "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "quyhoa",
    "name": "Bạo Vũ Lê Hoa",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 302,
      "missileId": 96,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        302
      ],
      "skillName": "Bạo Vũ Lê Hoa",
      "missileName": "暴雨梨花",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "skill_cost_v",
        "missle_lifetime_v",
        "skill_attackradius",
        "addskillexp1",
        "skill_skillexp_v",
        "skill_eventskilllevel",
        "skill_flyevent",
        "skill_showevent",
        "seriesdamage_p",
        "poisondamage_v",
        "addskilldamage1"
      ],
      "equipment": 102,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 15,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.throw",
    "range": 480,
    "radius": 32,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 2,
      "every": 0.944,
      "pulses": 3,
      "mine": false,
      "rangeDamage": false
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 2 giây, gây sát thương mỗi 0.944 giây (3 nhịp); một người nhận tối đa 250 sát thương gốc. Tầm nguồn: đặt xa 480px, bán kính 32px (1 ô CollidRange). Ngũ hành: trúng độc 50 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn); nhánh con khi trúng: trúng độc. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "sourceReach": {
      "attackRadius": 480,
      "cells": 1,
      "cellPx": 32,
      "from": "CollidRange"
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 50,
      "from": "302:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "branchEffects": {
      "301:20": {
        "event": "fly",
        "poison": {
          "dur": 3.333,
          "every": 0.556,
          "ticks": 6,
          "total": 50,
          "from": "301:20",
          "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "sutu",
    "name": "Sư Tử Hống",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 20,
      "missileId": 77,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        20
      ],
      "skillName": "Sư Tử Hống",
      "missileName": "定点全屏范围敌方子弹",
      "match": "exact",
      "style": 0,
      "attrs": [
        "stun_p",
        "physicsdamage_v",
        "skill_cost_v",
        "skill_eventskilllevel"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 40,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 240,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.slash",
    "range": 384,
    "radius": 384,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.333,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 384px (12 ô DmgRange). Không giới hạn binh khí. Hiệu ứng nguồn: 65% làm choáng 1,5 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 90,
      "cells": 12,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "stun": {
      "chance": 0.65,
      "dur": 1.5,
      "from": "20:20"
    },
    "sourceNotes": []
  },
  {
    "id": "docco",
    "name": "Độc Cô Cửu Kiếm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1368,
      "missileId": 418,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1368
      ],
      "skillName": "Độc Cô Cửu Kiếm",
      "missileName": "夺命连环三仙剑",
      "match": "exact",
      "style": 0,
      "attrs": [
        "fatallystrike_p",
        "physicsenhance_p",
        "seriesdamage_p",
        "colddamage_v",
        "deadlystrike_p",
        "skill_skillexp_v",
        "skill_misslenum_v"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 26,
      "factions": [],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 26,
    "nativeMotion": {
      "childCount": 9,
      "form": 3,
      "moveKind": 5,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 2,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 990,
    "mp": 32,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 480,
    "radius": 65,
    "form": {
      "shape": 3,
      "generate": 0,
      "gap": 5
    },
    "pierce": false,
    "simplifications": [
      "chí mạng ngẫu nhiên (sinh tồn không có chí mạng)"
    ],
    "count": 9,
    "speed": 540,
    "width": 32,
    "spread": 0.14,
    "radial": true,
    "capPerVictim": 330,
    "desc": "9 đạn đúng nguồn, tổng 990; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 480px, đạn bay 720px (540px/giây), va chạm 32px (1 ô CollidRange). Giản lược trong sinh tồn: chí mạng ngẫu nhiên (sinh tồn không có chí mạng). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 26; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 720,
    "sourceReach": {
      "attackRadius": 480,
      "speedPerFrame": 30,
      "lifeFrames": 24,
      "reach": 720,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1368:26",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "gianglong",
    "name": "Giáng Long Chưởng",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 274,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        274
      ],
      "skillName": "Giáng Long Chưởng",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "lifemax_p",
        "manamax_p",
        "addfiremagic_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {
      "atkBonus": 0.08,
      "hpMax": 80,
      "mpMax": 20
    },
    "move": {},
    "desc": "Bị động: +8% sát thương, +80 sinh lực tối đa, +20 nội lực tối đa. Chỉ số tham khảo cho cách chơi khác; không dùng trong sinh tồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "lucmach",
    "name": "Kiếm Thùy Tinh Hà",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1079,
      "missileId": 341,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1079
      ],
      "skillName": "Kiếm Thùy Tinh Hà",
      "missileName": "剑垂星河落",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "attackrating_p",
        "stealmana_p",
        "deadlystrike_p",
        "lightingdamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_collideevent",
        "skill_startevent",
        "skill_showevent",
        "stun_p",
        "skill_skillexp_v",
        "missle_lifetime_v",
        "seriesdamage_p"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 40,
    "cd": 14,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 120,
    "radius": 128,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.5,
      "every": 0.444,
      "pulses": 2,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 0.5 giây, gây sát thương mỗi 0.444 giây (2 nhịp); một người nhận tối đa 330 sát thương gốc. Tầm nguồn: đặt xa 120px, bán kính 128px (4 ô DmgRange). Hiệu ứng nguồn: 31% làm choáng 0,944 giây, hút 7% nội lực (×0,1 là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 2 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "sourceReach": {
      "attackRadius": 120,
      "cells": 4,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "stun": {
      "chance": 0.31,
      "dur": 0.944,
      "from": "1079:27"
    },
    "drain": {
      "life": 0,
      "mana": 0.07
    },
    "sourceNotes": [
      {
        "scope": "branch:start",
        "node": "1107:20",
        "name": "stun_p",
        "value": "23,0,0",
        "why": "thời gian choáng = 0; chưa xác minh client đọc số 0 thế nào — không chạy"
      },
      {
        "scope": "branch:collide",
        "node": "1105:20",
        "name": "drain",
        "why": "nhánh con không gây sát thương trong Sinh tồn — không chạy"
      }
    ]
  },
  {
    "id": "honnguyen",
    "name": "Hỗn Nguyên Nhất Khí công",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 9,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        9
      ],
      "skillName": "Hỗn Nguyên Nhất Khí công",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "staminamax_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {
      "stMax": 30
    },
    "move": {},
    "desc": "Bị động: +30 thể lực tối đa. Chỉ số tham khảo cho cách chơi khác; không dùng trong sinh tồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "tuha",
    "name": "Tử Hà Kiếm Khí",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 1365,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1365
      ],
      "skillName": "Tử Hà Kiếm Khí",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "autorescueskill",
        "skill_skillexp_v",
        "skill_desc"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "cuuamnoi",
    "name": "Huyền Âm Trảm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 355,
      "missileId": 165,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        355
      ],
      "skillName": "Huyền Âm Trảm",
      "missileName": "玄阴斩",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "poisondamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "skill_collideevent",
        "skill_showevent",
        "skill_eventskilllevel",
        "addskilldamage1"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 2,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 6
    },
    "pierce": true,
    "simplifications": [],
    "count": 2,
    "speed": 720,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "2 đạn đúng nguồn, tổng 250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 640px (720px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: trúng độc 50 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn); nhánh con khi trúng: trúng độc. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 640,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 40,
      "lifeFrames": 16,
      "reach": 640,
      "collidCells": 1
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 50,
      "from": "355:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "branchEffects": {
      "383:20": {
        "event": "collide",
        "poison": {
          "dur": 3.333,
          "every": 0.556,
          "ticks": 6,
          "total": 50,
          "from": "383:20",
          "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "dichcan",
    "name": "Dịch Cân kinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 21,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        21
      ],
      "skillName": "Dịch Cân kinh",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "allres_yan_p",
        "meleedamagereturn_p",
        "rangedamagereturn_p",
        "lifemax_yan_p",
        "lifemax_p",
        "anti_block_rate",
        "castspeed_yan_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {
      "dr": 0.08,
      "hpMax": 80
    },
    "move": {},
    "desc": "Bị động: +8% giảm sát thương nhận, +80 sinh lực tối đa. Chỉ số tham khảo cho cách chơi khác; không dùng trong sinh tồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "cuuduong",
    "name": "Thuần Dương Tâm pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 156,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        156
      ],
      "skillName": "Thuần Dương Tâm pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "manamax_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {
      "mpMax": 40
    },
    "move": {},
    "desc": "Bị động: +40 nội lực tối đa. Chỉ số tham khảo cho cách chơi khác; không dùng trong sinh tồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "bacminh",
    "name": "Bắc Minh Đáo Hải",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 393,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        393
      ],
      "skillName": "Bắc Minh Đáo Hải",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lifereplenish_v",
        "manareplenish_v",
        "skill_cost_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "missing-in-client",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "support",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "kimnhan",
    "name": "Di Khí Phiêu Tung",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 589,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        589
      ],
      "skillName": "Di Khí Phiêu Tung",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "fastwalkrun_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 10,
      "factions": [],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 10,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "than",
    "fx": {
      "move": 0.04
    },
    "move": {},
    "desc": "Bị động: +4% tốc chạy. Chỉ số tham khảo cho cách chơi khác; không dùng trong sinh tồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "thevan",
    "name": "Thế Vân Tung",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 160,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        160
      ],
      "skillName": "Thế Vân Tung",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "fastwalkrun_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "than",
    "fx": {
      "move": 0.06
    },
    "move": {},
    "desc": "Bị động: +6% tốc chạy. Chỉ số tham khảo cho cách chơi khác; không dùng trong sinh tồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "thanhanh",
    "name": "Huyễn Anh Mê Tung Bộ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 995,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        995
      ],
      "skillName": "Huyễn Anh Mê Tung Bộ",
      "missileName": null,
      "match": "exact",
      "style": 1,
      "attrs": [],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 13,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 0,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "langba",
    "name": "Lăng Ba Vi Bộ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 629,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        629
      ],
      "skillName": "Lăng Ba Vi Bộ",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "lifemax_v",
        "fastwalkrun_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 1,
      "factions": [],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 1,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "than",
    "fx": {
      "move": 0.08,
      "hpMax": 60
    },
    "move": {},
    "desc": "Bị động: +8% tốc chạy, +60 sinh lực tối đa. Chỉ số tham khảo cho cách chơi khác; không dùng trong sinh tồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-hanglong",
    "name": "Hàng Long Bất Vũ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 14,
      "missileId": 66,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        14
      ],
      "skillName": "Hàng Long Bất Vũ",
      "missileName": "行龙不雨",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "addskilldamage1",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4",
        "addskilldamage5",
        "addskilldamage6"
      ],
      "equipment": -1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 5,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "quyen",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.palm",
    "range": 128,
    "radius": 128,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.833,
      "every": 0.556,
      "pulses": 2,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 0.833 giây, gây sát thương mỗi 0.556 giây (2 nhịp); một người nhận tối đa 160 sát thương gốc. Tầm nguồn: quanh thân, bán kính 128px (4 ô DmgRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 90,
      "cells": 4,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-bachhong",
    "name": "Bạch Hồng Quán Nhật",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 1347,
      "missileId": 412,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1347
      ],
      "skillName": "Bạch Hồng Quán Nhật",
      "missileName": "白虹贯日",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage1",
        "addskilldamage2",
        "skill_showevent",
        "seriesdamage_p",
        "skill_eventskilllevel",
        "addskilldamage3"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 400,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 5
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 360,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 400px, đạn bay 400px (360px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 400,
    "sourceReach": {
      "attackRadius": 400,
      "speedPerFrame": 20,
      "lifeFrames": 20,
      "reach": 400,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1347:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-philong",
    "name": "Phi Long Tại Thiên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 357,
      "missileId": 166,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        357
      ],
      "skillName": "Phi Long Tại Thiên",
      "missileName": "飞龙在天",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_collideevent",
        "skill_showevent",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "skill_misslenum_v",
        "addskilldamage1",
        "addskilldamage2"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 3,
      "form": 0,
      "moveKind": 5,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.dragon",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 0,
      "generate": 5,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 4,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "4 rồng Phi Long Tại Thiên ở đủ cấp, phóng song song rồi bám mục tiêu, tổng 250 sát thương. Trúng đủ đẩy lùi; bị vật cản chặn. Tầm nguồn: thi triển 512px, đạn bay 576px (432px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 576,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 24,
      "lifeFrames": 24,
      "reach": 576,
      "collidCells": 1
    },
    "arc": 0.7,
    "homing": 7,
    "homingDelay": 0,
    "knockback": 120,
    "telegraph": true,
    "sourceNotes": []
  },
  {
    "id": "vltk-thienha",
    "name": "Thiên Hạ Vô Cẩu",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 359,
      "missileId": 168,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        359
      ],
      "skillName": "Thiên Hạ Vô Cẩu",
      "missileName": "天下无狗",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "firedamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "skill_misslenum_v",
        "addskilldamage1"
      ],
      "equipment": 2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 16,
      "form": 0,
      "moveKind": 5,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "con",
    "survivalStatus": "playable",
    "dmg": 750,
    "mp": 27,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 0,
      "generate": 5,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 3,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "3 đạn đúng nguồn, tổng 750; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 768px (432px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 768,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 24,
      "lifeFrames": 32,
      "reach": 768,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-ngami-nhatdiep",
    "name": "Nhất Diệp Tri Thu",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 85,
      "missileId": 2,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        85
      ],
      "skillName": "Nhất Diệp Tri Thu",
      "missileName": "一叶知秋",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "colddamage_v",
        "deadlystrike_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 5
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 384px, đạn bay 768px (432px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 768,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 32,
      "reach": 768,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "85:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-ngami-phieutuyet",
    "name": "Phiêu Tuyết Xuyên Vân",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 80,
      "missileId": 68,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        80
      ],
      "skillName": "Phiêu Tuyết Xuyên Vân",
      "missileName": "飘雪穿云",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage2",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "addskilldamage1",
        "addskilldamage3"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 384px, đạn bay 384px (432px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 384,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 16,
      "reach": 384,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "80:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-thuyyen-phonghoa",
    "name": "Phong Hoa Tuyết Nguyệt",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 99,
      "missileId": 6,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        99
      ],
      "skillName": "Phong Hoa Tuyết Nguyệt",
      "missileName": "风云突起",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 384px, đạn bay 480px (432px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 480,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 20,
      "reach": 480,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "99:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-conlon-cuongphong",
    "name": "Cuồng Phong Sậu Điện",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 176,
      "missileId": 16,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        176
      ],
      "skillName": "Cuồng Phong Sậu Điện",
      "missileName": "狂风骤电",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "lightingdamage_v",
        "stun_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 50,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 576,
    "width": 64,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "1 đạn đúng nguồn, tổng 220; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 64px (2 ô CollidRange). Hiệu ứng nguồn: 15% làm choáng 1,111 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 2
    },
    "stun": {
      "chance": 0.15,
      "dur": 1.111,
      "from": "176:20"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-conlon-nguloi",
    "name": "Ngũ Lôi Chánh Pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 182,
      "missileId": 18,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        182
      ],
      "skillName": "Ngũ Lôi Chánh Pháp",
      "missileName": "五雷正法",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_v",
        "addskilldamage1",
        "skill_attackradius",
        "seriesdamage_p",
        "skill_cost_v",
        "addskilldamage2"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 4,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 480,
    "radius": 64,
    "form": {
      "shape": 6,
      "generate": 3,
      "gap": 5
    },
    "zone": {
      "life": 0.222,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 0.222 giây, nổ khi kẻ địch chạm vào, gây 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 480px, bán kính 64px (2 ô DmgRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 480,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-4",
    "name": "Thiếu Lâm côn pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 4,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        4
      ],
      "skillName": "Thiếu Lâm côn pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "attackratingenhance_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-6",
    "name": "Thiếu Lâm đao pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 6,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        6
      ],
      "skillName": "Thiếu Lâm đao pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-10",
    "name": "Kim Cang Phục Ma",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 10,
      "missileId": 63,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        10,
        216
      ],
      "skillName": "Kim Cang Phục Ma",
      "missileName": "短兵物理攻击",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "addskilldamage2",
        "missle_speed_v",
        "missle_lifetime_v",
        "skill_attackradius",
        "addskilldamage1",
        "seriesdamage_p",
        "addskilldamage3",
        "addskilldamage4",
        "skill_cost_v",
        "addskilldamage5",
        "addskilldamage6"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 54,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 324,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 54px, đạn bay 72px (324px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 72,
    "sourceReach": {
      "attackRadius": 54,
      "speedPerFrame": 18,
      "lifeFrames": 4,
      "reach": 72,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-11",
    "name": "Hoành Tảo Lục Hợp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 11,
      "missileId": 86,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        11
      ],
      "skillName": "Hoành Tảo Lục Hợp",
      "missileName": "横扫六合",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "attackrating_p",
        "deadlystrike_p",
        "addskilldamage1",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage2"
      ],
      "equipment": 2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 50,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "con",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.thrust",
    "range": 128,
    "radius": 128,
    "form": {
      "shape": 7,
      "generate": 1,
      "gap": 6
    },
    "zone": {
      "life": 0.056,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 0.056 giây, nổ khi kẻ địch chạm vào, gây 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 128px (4 ô DmgRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 96,
      "cells": 4,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "11:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-15",
    "name": "Bất động Minh Vương",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 15,
      "missileId": 76,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        15
      ],
      "skillName": "Bất động Minh Vương",
      "missileName": "定点全屏范围己方子弹",
      "match": "exact",
      "style": 0,
      "attrs": [
        "attackratingenhance_p",
        "adddefense_v",
        "skill_cost_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 3,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 20,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-16",
    "name": "La Hán Trận",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 16,
      "missileId": 92,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        16,
        202
      ],
      "skillName": "La Hán Trận",
      "missileName": "友好光环传递子弹",
      "match": "exact",
      "style": 2,
      "attrs": [
        "addphysicsdamage_p",
        "meleedamagereturn_p",
        "rangedamagereturn_p",
        "adddefense_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 3,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-19",
    "name": "Ma Ha Vô Lượng",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 19,
      "missileId": 61,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        19
      ],
      "skillName": "Ma Ha Vô Lượng",
      "missileName": "摩诃无量",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage2"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 2,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 50,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 9
    },
    "pierce": true,
    "simplifications": [],
    "count": 2,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "2 đạn đúng nguồn, tổng 220; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "19:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-23",
    "name": "Thiên Vương thương pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 23,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        23
      ],
      "skillName": "Thiên Vương thương pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "attackratingenhance_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-24",
    "name": "Thiên Vương đao pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 24,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        24
      ],
      "skillName": "Thiên Vương đao pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "attackratingenhance_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-26",
    "name": "Thiên Vương chùy pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 26,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        26
      ],
      "skillName": "Thiên Vương chùy pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "attackratingenhance_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 4,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-29",
    "name": "Trảm Long quyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 29,
      "missileId": 63,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        29,
        405
      ],
      "skillName": "Trảm Long quyết",
      "missileName": "短兵物理攻击",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "ignoredefense_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4",
        "addskilldamage5",
        "addskilldamage6"
      ],
      "equipment": 4,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=4 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=4 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-30",
    "name": "Hồi Phong Lạc Nhạn",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 30,
      "missileId": 63,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        30,
        219
      ],
      "skillName": "Hồi Phong Lạc Nhạn",
      "missileName": "短兵物理攻击",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "attackrating_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4",
        "addskilldamage5",
        "addskilldamage6"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "thuong",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 54,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 324,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 54px, đạn bay 72px (324px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 72,
    "sourceReach": {
      "attackRadius": 54,
      "speedPerFrame": 18,
      "lifeFrames": 4,
      "reach": 72,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-31",
    "name": "Hàng Vân Quyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 31,
      "missileId": 63,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        31,
        406
      ],
      "skillName": "Hàng Vân Quyết",
      "missileName": "短兵物理攻击",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "ignoredefense_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": 4,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=4 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=4 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-32",
    "name": "Vô Tâm Trảm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 32,
      "missileId": 63,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        32,
        220
      ],
      "skillName": "Vô Tâm Trảm",
      "missileName": "短兵物理攻击",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "seriesdamage_p",
        "deadlystrike_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4",
        "addskilldamage5"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 78,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 468,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "1 đạn đúng nguồn, tổng 220; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 78px, đạn bay 104px (468px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 104,
    "sourceReach": {
      "attackRadius": 78,
      "speedPerFrame": 26,
      "lifeFrames": 4,
      "reach": 104,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-33",
    "name": "Tĩnh Tâm Quyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 33,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        33
      ],
      "skillName": "Tĩnh Tâm Quyết",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "attackratingenhance_p",
        "skill_cost_v",
        "attackratingenhance_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 20,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-34",
    "name": "Kinh Lôi Trảm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 34,
      "missileId": 63,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        34,
        404
      ],
      "skillName": "Kinh Lôi Trảm",
      "missileName": "短兵物理攻击",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "seriesdamage_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4",
        "addskilldamage5",
        "addskilldamage6",
        "addskilldamage7"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 54,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 324,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 54px, đạn bay 72px (324px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 72,
    "sourceReach": {
      "attackRadius": 54,
      "speedPerFrame": 18,
      "lifeFrames": 4,
      "reach": 72,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-35",
    "name": "Dương Quan Tam Điệp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 35,
      "missileId": 63,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        35,
        221
      ],
      "skillName": "Dương Quan Tam Điệp",
      "missileName": "短兵物理攻击",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "attackrating_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "thuong",
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 66,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 396,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 185,
    "desc": "1 đạn đúng nguồn, tổng 185; một người nhận tối đa 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 66px, đạn bay 88px (396px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 88,
    "sourceReach": {
      "attackRadius": 66,
      "speedPerFrame": 22,
      "lifeFrames": 4,
      "reach": 88,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-36",
    "name": "Thiên Vương Chiến ý",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 36,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        36
      ],
      "skillName": "Thiên Vương Chiến ý",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "lifemax_p",
        "lifemax_yan_p",
        "deadlystrikeenhance_p",
        "anti_hitrecover",
        "me2wooddamage_p",
        "wood2medamage_p",
        "returnres_p",
        "anti_block_rate",
        "fasthitrecover_yan_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-37",
    "name": "Bát Phong Trảm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 37,
      "missileId": 63,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        37,
        222
      ],
      "skillName": "Bát Phong Trảm",
      "missileName": "短兵物理攻击",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "seriesdamage_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4",
        "addskilldamage5"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 66,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 396,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 185,
    "desc": "1 đạn đúng nguồn, tổng 185; một người nhận tối đa 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 66px, đạn bay 88px (396px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 88,
    "sourceReach": {
      "attackRadius": 66,
      "speedPerFrame": 22,
      "lifeFrames": 4,
      "reach": 88,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-40",
    "name": "Đoạn Hồn Thích",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 40,
      "missileId": 284,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        40,
        224
      ],
      "skillName": "Đoạn Hồn Thích",
      "missileName": "断魂刺伤害",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "stun_p",
        "deadlystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_param1_v",
        "skill_param2_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 40,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 960,
    "radius": 160,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.444,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 960px, bán kính 160px (5 ô DmgRange). Không giới hạn binh khí. Hiệu ứng nguồn: 40% làm choáng 1,5 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "sourceReach": {
      "attackRadius": 960,
      "cells": 5,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "stun": {
      "chance": 0.4,
      "dur": 1.5,
      "from": "40:20"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-41",
    "name": "Huyết Chiến Bát Phương",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 41,
      "missileId": 63,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        41,
        225
      ],
      "skillName": "Huyết Chiến Bát Phương",
      "missileName": "短兵物理攻击",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "attackrating_p",
        "deadlystrike_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "thuong",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 78,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 468,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "1 đạn đúng nguồn, tổng 220; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 78px, đạn bay 104px (468px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 104,
    "sourceReach": {
      "attackRadius": 78,
      "speedPerFrame": 26,
      "lifeFrames": 4,
      "reach": 104,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-42",
    "name": "Kim Chung Tráo",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 42,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        42
      ],
      "skillName": "Kim Chung Tráo",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "physicsres_yan_p",
        "coldres_yan_p",
        "fireres_yan_p",
        "skill_cost_v",
        "poisonres_yan_p",
        "sorbdamage_yan_p",
        "coldenhance_p",
        "fastwalkrun_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 50,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-43",
    "name": "Đường Môn ám khí",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 43,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        43
      ],
      "skillName": "Đường Môn ám khí",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-45",
    "name": "Tích Lịch đơn",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 45,
      "missileId": 35,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        45
      ],
      "skillName": "Tích Lịch đơn",
      "missileName": "霹雳弹",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "addskilldamage1",
        "addskilldamage2",
        "addskilldamage3",
        "skill_cost_v",
        "poisondamage_v",
        "seriesdamage_p",
        "addskilldamage4",
        "addskilldamage5",
        "addskilldamage6",
        "addskilldamage7",
        "addskilldamage8",
        "addskilldamage9"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 7,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 400,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 288,
    "width": 96,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 400px, đạn bay 960px (288px/giây), va chạm 96px (3 ô CollidRange). Không giới hạn binh khí. Ngũ hành: trúng độc 32 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 960,
    "sourceReach": {
      "attackRadius": 400,
      "speedPerFrame": 16,
      "lifeFrames": 60,
      "reach": 960,
      "collidCells": 3
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 32,
      "from": "45:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-47",
    "name": "Đoạt Hồn Tiêu",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 47,
      "missileId": 116,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        47
      ],
      "skillName": "Đoạt Hồn Tiêu",
      "missileName": "夺魂镖",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "poisondamage_v",
        "addskilldamage1",
        "poisondamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": 100,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.throw",
    "range": 448,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 504,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 185,
    "desc": "1 đạn đúng nguồn, tổng 185; một người nhận tối đa 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 448px, đạn bay 700px (504px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: trúng độc 37 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 700,
    "sourceReach": {
      "attackRadius": 448,
      "speedPerFrame": 28,
      "lifeFrames": 25,
      "reach": 700,
      "collidCells": 1
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 37,
      "from": "47:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-48",
    "name": "Tâm Nhãn",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 48,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        48
      ],
      "skillName": "Tâm Nhãn",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addcolddamage_v",
        "addpoisondamage_v",
        "poisonenhance_p",
        "deadlystrikeenhance_p",
        "attackspeed_v",
        "addphysicsdamage_p",
        "lifemax_yan_p",
        "do_hurt_p",
        "me2earthdamage_p",
        "earth2medamage_p",
        "anti_do_stun_p",
        "anti_block_rate",
        "fastwalkrun_p",
        "fasthitrecover_yan_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-50",
    "name": "Truy Tâm Tiễn",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 50,
      "missileId": 37,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        50
      ],
      "skillName": "Truy Tâm Tiễn",
      "missileName": "追心箭",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "poisondamage_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": 101,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 2,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.throw",
    "range": 448,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 4
    },
    "pierce": false,
    "simplifications": [],
    "count": 2,
    "speed": 504,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 185,
    "desc": "2 đạn đúng nguồn, tổng 185; một người nhận tối đa 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 448px, đạn bay 448px (504px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: trúng độc 37 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 448,
    "sourceReach": {
      "attackRadius": 448,
      "speedPerFrame": 28,
      "lifeFrames": 16,
      "reach": 448,
      "collidCells": 1
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 37,
      "from": "50:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-54",
    "name": "Mạn Thiên Hoa Vũ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 54,
      "missileId": 38,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        54
      ],
      "skillName": "Mạn Thiên Hoa Vũ",
      "missileName": "漫天花雨",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "addskilldamage1",
        "skill_attackradius",
        "skill_cost_v",
        "poisondamage_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": 102,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 20,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.throw",
    "range": 416,
    "radius": 96,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 2.167,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 416px, bán kính 96px (3 ô DmgRange). Ngũ hành: trúng độc 37 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 416,
      "cells": 3,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 37,
      "from": "54:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-58",
    "name": "Thiên La Địa Võng",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 58,
      "missileId": 67,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        58
      ],
      "skillName": "Thiên La Địa Võng",
      "missileName": "天罗地网小子弹",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "poisondamage_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": 102,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 5,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.throw",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 504,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "1 đạn đúng nguồn, tổng 220; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 1008px (504px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: trúng độc 44 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 1008,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 28,
      "lifeFrames": 36,
      "reach": 1008,
      "collidCells": 1
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 44,
      "from": "58:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-60",
    "name": "Ngũ Độc đao pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 60,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        60
      ],
      "skillName": "Ngũ Độc đao pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-62",
    "name": "Ngũ Độc chưởng pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 62,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        62
      ],
      "skillName": "Ngũ Độc chưởng pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addpoisonmagic_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-63",
    "name": "Độc Sa chưởng",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 63,
      "missileId": 30,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        63
      ],
      "skillName": "Độc Sa chưởng",
      "missileName": "毒砂掌",
      "match": "exact",
      "style": 0,
      "attrs": [
        "poisondamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4",
        "addskilldamage5"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 384px, đạn bay 384px (432px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Ngũ hành: trúng độc 32 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 384,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 16,
      "reach": 384,
      "collidCells": 1
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 32,
      "from": "63:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-64",
    "name": "Băng Lam Huyền Tinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 64,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        64
      ],
      "skillName": "Băng Lam Huyền Tinh",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "coldres_yan_p",
        "skill_cost_v",
        "coldresmax_p",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-66",
    "name": "Tạp Nan Dược Kinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 66,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        66
      ],
      "skillName": "Tạp Nan Dược Kinh",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "poisonres_yan_p",
        "poisontimereduce_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-67",
    "name": "Cửu Thiên Cuồng Lôi",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 67,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        67
      ],
      "skillName": "Cửu Thiên Cuồng Lôi",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingres_yan_p",
        "skill_cost_v",
        "lightingresmax_p",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 10,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-68",
    "name": "U Minh Khô Lâu",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 68,
      "missileId": 32,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        68
      ],
      "skillName": "U Minh Khô Lâu",
      "missileName": "骷髅炸弹",
      "match": "exact",
      "style": 0,
      "attrs": [
        "poisondamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 448,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 504,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 185,
    "desc": "1 đạn đúng nguồn, tổng 185; một người nhận tối đa 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 448px, đạn bay 448px (504px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Ngũ hành: trúng độc 37 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 448,
    "sourceReach": {
      "attackRadius": 448,
      "speedPerFrame": 28,
      "lifeFrames": 16,
      "reach": 448,
      "collidCells": 1
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 37,
      "from": "68:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-69",
    "name": "Vô Hình Độc",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 69,
      "missileId": 94,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        69,
        203
      ],
      "skillName": "Vô Hình Độc",
      "missileName": "伤害类短光环传递子弹",
      "match": "exact",
      "style": 2,
      "attrs": [
        "poisondamage_v",
        "fastwalkrun_p",
        "anti_block_rate_buff"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-70",
    "name": "Xích Diệm Thực Thiên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 70,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        70
      ],
      "skillName": "Xích Diệm Thực Thiên",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "fireres_yan_p",
        "skill_cost_v",
        "fireresmax_p",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 20,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-71",
    "name": "Thiên Cương Địa Sát",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 71,
      "missileId": 33,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        71
      ],
      "skillName": "Thiên Cương Địa Sát",
      "missileName": "九阴白骨抓",
      "match": "exact",
      "style": 0,
      "attrs": [
        "poisondamage_v",
        "addskilldamage1",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 20,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 480,
    "radius": 96,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.333,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": false
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 480px, bán kính 96px (3 ô CollidRange). Không giới hạn binh khí. Ngũ hành: trúng độc 44 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 480,
      "cells": 3,
      "cellPx": 32,
      "from": "CollidRange"
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 44,
      "from": "71:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-72",
    "name": "Xuyên Tâm Độc Thích",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 72,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        72
      ],
      "skillName": "Xuyên Tâm Độc Thích",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "poisonres_yan_p",
        "skill_cost_v",
        "poisonresmax_p",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 50,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-73",
    "name": "Vạn Độc Thực Tâm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 73,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        73
      ],
      "skillName": "Vạn Độc Thực Tâm",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "poisontimereduce_p",
        "skill_cost_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 40,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-74",
    "name": "Chu Cáp Thanh Minh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 74,
      "missileId": 34,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        74
      ],
      "skillName": "Chu Cáp Thanh Minh",
      "missileName": "蛤蟆功",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "poisondamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 2,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 9
    },
    "pierce": false,
    "simplifications": [],
    "count": 2,
    "speed": 576,
    "width": 64,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "2 đạn đúng nguồn, tổng 220; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 64px (2 ô CollidRange). Ngũ hành: trúng độc 44 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 2
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 44,
      "from": "74:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-75",
    "name": "Ngũ Độc Kỳ Kinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 75,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        75
      ],
      "skillName": "Ngũ Độc Kỳ Kinh",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addpoisondamage_v",
        "addpoisonmagic_v",
        "poisonenhance_p",
        "deadlystrikeenhance_p",
        "lifemax_yan_p",
        "castspeed_v",
        "castspeed_yan_v",
        "attackspeed_yan_v",
        "anti_poisonres_yan_p",
        "me2earthdamage_p",
        "earth2medamage_p",
        "anti_do_stun_p",
        "anti_block_rate",
        "fastwalkrun_p",
        "lifemax_p",
        "fasthitrecover_yan_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-77",
    "name": "Nga Mi kiếm pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 77,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        77
      ],
      "skillName": "Nga Mi kiếm pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-79",
    "name": "Nga Mi chưởng pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 79,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        79
      ],
      "skillName": "Nga Mi chưởng pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addcoldmagic_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-82",
    "name": "Tứ Tượng Đồng Quy",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 82,
      "missileId": 101,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        82
      ],
      "skillName": "Tứ Tượng Đồng Quy",
      "missileName": "四象同归中心",
      "match": "exact",
      "style": 0,
      "attrs": [
        "colddamage_v",
        "addskilldamage1",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 416,
    "radius": 64,
    "form": {
      "shape": 6,
      "generate": 1,
      "gap": 0
    },
    "zone": {
      "life": 0.056,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 416px, bán kính 64px (2 ô DmgRange). Không giới hạn binh khí. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 416,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "82:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "243:1": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "243:1",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-86",
    "name": "Lưu Thủy",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 86,
      "missileId": 92,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        86,
        206
      ],
      "skillName": "Lưu Thủy",
      "missileName": "友好光环传递子弹",
      "match": "exact",
      "style": 2,
      "attrs": [
        "fastwalkrun_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 3,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 40,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-88",
    "name": "Bất Diệt Bất Tuyệt",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 88,
      "missileId": 3,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        88
      ],
      "skillName": "Bất Diệt Bất Tuyệt",
      "missileName": "不灭不绝",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "colddamage_v",
        "deadlystrike_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 20
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "1 đạn đúng nguồn, tổng 220; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "88:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-89",
    "name": "Mộng Điệp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 89,
      "missileId": 92,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        89,
        207
      ],
      "skillName": "Mộng Điệp",
      "missileName": "友好光环传递子弹",
      "match": "exact",
      "style": 2,
      "attrs": [
        "lifereplenish_v",
        "manareplenish_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 3,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-90",
    "name": "Mê Tung ảo ảnh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 90,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        90
      ],
      "skillName": "Mê Tung ảo ảnh",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "freezetimereduce_p",
        "stuntimereduce_p",
        "skill_cost_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 50,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-91",
    "name": "Phật Quang Phổ Chiếu",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 91,
      "missileId": 4,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        91
      ],
      "skillName": "Phật Quang Phổ Chiếu",
      "missileName": "佛光普照",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage2",
        "skill_cost_v",
        "addskilldamage3"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.slash",
    "range": 128,
    "radius": 128,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.667,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 128px (4 ô DmgRange). Không giới hạn binh khí. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 400,
      "cells": 4,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "91:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-92",
    "name": "Phật Tâm Từ Hữu",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 92,
      "missileId": 92,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        92,
        208
      ],
      "skillName": "Phật Tâm Từ Hữu",
      "missileName": "友好光环传递子弹",
      "match": "exact",
      "style": 2,
      "attrs": [
        "lifemax_p",
        "lifemax_yan_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 3,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 50,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-93",
    "name": "Từ Hàng Phổ D",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 93,
      "missileId": 5,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        93
      ],
      "skillName": "Từ Hàng Phổ D",
      "missileName": "慈航普渡",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lifereplenish_v",
        "skill_cost_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 20,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-95",
    "name": "Thúy Yên đao pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 95,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        95
      ],
      "skillName": "Thúy Yên đao pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-97",
    "name": "Thúy Yên song đao",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 97,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        97
      ],
      "skillName": "Thúy Yên song đao",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addcoldmagic_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-100",
    "name": "Hộ Thể Hàn Băng",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 100,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        100
      ],
      "skillName": "Hộ Thể Hàn Băng",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "meleedamagereturn_p",
        "rangedamagereturn_p",
        "skill_cost_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 40,
    "sourceRole": "support",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-102",
    "name": "Phong Quyển Tàn Tuyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 102,
      "missileId": 7,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        102
      ],
      "skillName": "Phong Quyển Tàn Tuyết",
      "missileName": "风卷残雪",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsdamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 5,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 64,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 384px, đạn bay 384px (432px/giây), va chạm 64px (2 ô CollidRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 384,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 16,
      "reach": 384,
      "collidCells": 2
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-105",
    "name": "Vũ Đả Lê Hoa",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 105,
      "missileId": 8,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        105
      ],
      "skillName": "Vũ Đả Lê Hoa",
      "missileName": "雨打梨花",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "addskilldamage1",
        "skill_attackradiu",
        "skill_cost_v",
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage2"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 4,
      "form": 6,
      "moveKind": 1,
      "height": 450,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 300,
    "radius": 64,
    "form": {
      "shape": 6,
      "generate": 3,
      "gap": 10
    },
    "pierce": false,
    "simplifications": [],
    "count": 4,
    "speed": 600,
    "width": 20,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 185,
    "desc": "4 đạn đúng nguồn, tổng 185; một người nhận tối đa 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 300px, bán kính 64px (2 ô DmgRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 300,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "105:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-108",
    "name": "Mục Dã Lưu Tinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 108,
      "missileId": 9,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        108
      ],
      "skillName": "Mục Dã Lưu Tinh",
      "missileName": "牧野流星a",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "colddamage_v",
        "addskilldamage1",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 320,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 480,
    "radius": 64,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 1.333,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 1.333 giây, nổ khi kẻ địch chạm vào, gây 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 480px, bán kính 64px (2 ô DmgRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 480,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "108:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-109",
    "name": "Tuyết ảnh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 109,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        109
      ],
      "skillName": "Tuyết ảnh",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "attackspeed_v",
        "castspeed_v",
        "skill_cost_v",
        "fastwalkrun_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 50,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-111",
    "name": "Bích Hải Triều Sinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 111,
      "missileId": 10,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        111
      ],
      "skillName": "Bích Hải Triều Sinh",
      "missileName": "碧海潮生a",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsdamage_v",
        "colddamage_v",
        "addskilldamage1",
        "skill_cost_v",
        "addskilldamage2",
        "seriesdamage_p",
        "addskilldamage3"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.slash",
    "range": 256,
    "radius": 256,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.278,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 256px (8 ô DmgRange). Không giới hạn binh khí. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 72,
      "cells": 8,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "111:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "112:1": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "112:1",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-113",
    "name": "Phù Vân Tán Tuyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 113,
      "missileId": 12,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        113
      ],
      "skillName": "Phù Vân Tán Tuyết",
      "missileName": "浮云散雪",
      "match": "exact",
      "style": 0,
      "attrs": [
        "colddamage_v",
        "addskilldamage1",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 15,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 416,
    "radius": 96,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.833,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 416px, bán kính 96px (3 ô DmgRange). Không giới hạn binh khí. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 416,
      "cells": 3,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "113:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-114",
    "name": "Băng Cốt Tuyết Tâm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 114,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        114
      ],
      "skillName": "Băng Cốt Tuyết Tâm",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addcoldmagic_v",
        "addcolddamage_v",
        "deadlystrikeenhance_p",
        "coldenhance_p",
        "addphysicsmagic_v",
        "lifemax_yan_p",
        "fasthitrecover_yan_v",
        "allres_yan_p",
        "me2firedamage_p",
        "fire2medamage_p",
        "anti_block_rate",
        "enhancehit_rate",
        "fatallystrikeres_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-115",
    "name": "Cái Bang Bổng pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 115,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        115
      ],
      "skillName": "Cái Bang Bổng pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-116",
    "name": "Cái Bang chưởng pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 116,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        116
      ],
      "skillName": "Cái Bang chưởng pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addfiremagic_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-119",
    "name": "Diên Môn Thác Bát",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 119,
      "missileId": 45,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        119
      ],
      "skillName": "Diên Môn Thác Bát",
      "missileName": "沿门托钵",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "firedamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradiu",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": 2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "con",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 240,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 240px, đạn bay 384px (432px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 384,
    "sourceReach": {
      "attackRadius": 240,
      "speedPerFrame": 24,
      "lifeFrames": 16,
      "reach": 384,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-122",
    "name": "Kiến Nhân Thần Thủ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 122,
      "missileId": 46,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        122
      ],
      "skillName": "Kiến Nhân Thần Thủ",
      "missileName": "见人伸手",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 384px, đạn bay 384px (432px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 384,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 16,
      "reach": 384,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-125",
    "name": "Bổng Đả ác Cẩu",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 125,
      "missileId": 47,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        125
      ],
      "skillName": "Bổng Đả ác Cẩu",
      "missileName": "棒打恶狗",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "firedamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": 2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 16,
      "form": 3,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 50,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "con",
    "survivalStatus": "playable",
    "dmg": 3520,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 3,
      "generate": 0,
      "gap": 5
    },
    "pierce": false,
    "simplifications": [],
    "count": 16,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": true,
    "capPerVictim": 220,
    "desc": "16 đạn đúng nguồn, tổng 3520; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-128",
    "name": "Kháng Long Hữu Hối",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 128,
      "missileId": 48,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        128
      ],
      "skillName": "Kháng Long Hữu Hối",
      "missileName": "亢龙有悔",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "skill_param1_v",
        "skill_misslenum_v",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 8,
      "form": 2,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 50,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 3300,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 2,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 15,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "15 đạn đúng nguồn, tổng 3300; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-129",
    "name": "Hóa Hiểm Vi Di",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 129,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        129
      ],
      "skillName": "Hóa Hiểm Vi Di",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "meleedamagereturn_p",
        "adddefense_v",
        "anti_block_rate"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-130",
    "name": "Túy Điệp Cuồng Vũ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 130,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        130
      ],
      "skillName": "Túy Điệp Cuồng Vũ",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "allres_yan_p",
        "addfiremagic_v",
        "addfiredamage_v",
        "deadlystrikeenhance_p",
        "lifemax_yan_p",
        "skill_cost_v",
        "returnres_p",
        "me2metaldamage_p",
        "metal2medamage_p",
        "physicsres_yan_p",
        "fasthitrecover_yan_v",
        "melee_returnres_p",
        "fireenhance_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 60,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-131",
    "name": "Thiên Nhẫn đao pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 131,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        131
      ],
      "skillName": "Thiên Nhẫn đao pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addfiremagic_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-132",
    "name": "Thiên Nhẫn mâu pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 132,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        132
      ],
      "skillName": "Thiên Nhẫn mâu pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "attackratingenhance_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-135",
    "name": "Tàn Dương Như Huyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 135,
      "missileId": 54,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        135
      ],
      "skillName": "Tàn Dương Như Huyết",
      "missileName": "残阳如血",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "firedamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "thuong",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 384px, đạn bay 384px (432px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 384,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 16,
      "reach": 384,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-136",
    "name": "Hỏa Liên Phần Hoa",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 136,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        136
      ],
      "skillName": "Hỏa Liên Phần Hoa",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "meleedamagereturn_p",
        "skill_cost_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 10,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-137",
    "name": "ảo ảnh Phi Hồ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 137,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        137
      ],
      "skillName": "ảo ảnh Phi Hồ",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "attackratingenhance_p",
        "skill_cost_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 20,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-138",
    "name": "Thôi sơn  Điền Hải",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 138,
      "missileId": 55,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        138
      ],
      "skillName": "Thôi sơn  Điền Hải",
      "missileName": "推山填海",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "addskilldamage1",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 10,
      "form": 0,
      "moveKind": 0,
      "height": 20,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 400,
    "radius": 64,
    "form": {
      "shape": 0,
      "generate": 5,
      "gap": 5
    },
    "zone": {
      "life": 6.667,
      "every": 0.667,
      "pulses": 10,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 6.667 giây, gây sát thương mỗi 0.667 giây (10 nhịp); một người nhận tối đa 185 sát thương gốc. Tầm nguồn: đặt xa 400px, bán kính 64px (2 ô DmgRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 400,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-140",
    "name": "Phi Hồng Vô Tích",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 140,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        140
      ],
      "skillName": "Phi Hồng Vô Tích",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "adddefense_v",
        "skill_cost_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-141",
    "name": "Liệt Hỏa Tình Thiên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 141,
      "missileId": 56,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        141
      ],
      "skillName": "Liệt Hỏa Tình Thiên",
      "missileName": "烈火情天",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "firedamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "physicsenhance_p",
        "addskilldamage2"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 16,
      "form": 3,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "thuong",
    "survivalStatus": "playable",
    "dmg": 2960,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 448,
    "radius": 65,
    "form": {
      "shape": 3,
      "generate": 1,
      "gap": 5
    },
    "pierce": false,
    "simplifications": [],
    "count": 16,
    "speed": 504,
    "width": 32,
    "spread": 0.14,
    "radial": true,
    "capPerVictim": 185,
    "desc": "16 đạn đúng nguồn, tổng 2960; một người nhận tối đa 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 448px, đạn bay 448px (504px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 448,
    "sourceReach": {
      "attackRadius": 448,
      "speedPerFrame": 28,
      "lifeFrames": 16,
      "reach": 448,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-142",
    "name": "Thâu Thiên Hoán Nhật",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 142,
      "missileId": 69,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        142
      ],
      "skillName": "Thâu Thiên Hoán Nhật",
      "missileName": "偷天换日",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "firedamage_v",
        "addskilldamage1",
        "steallife_p",
        "stealmana_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "deadlystrike_p",
        "addskilldamage2"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "missing-in-client",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "thuong",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 78,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 468,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "1 đạn đúng nguồn, tổng 220; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 78px, đạn bay 104px (468px/giây), va chạm 32px (1 ô CollidRange). Hiệu ứng nguồn: hút 8% sinh lực, hút 6% nội lực (×0,1 là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 104,
    "sourceReach": {
      "attackRadius": 78,
      "speedPerFrame": 26,
      "lifeFrames": 4,
      "reach": 104,
      "collidCells": 1
    },
    "drain": {
      "life": 0.08,
      "mana": 0.06
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-143",
    "name": "Lịch Ma Đoạt Hồn",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 143,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        143
      ],
      "skillName": "Lịch Ma Đoạt Hồn",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "addphysicsdamage_p",
        "skill_cost_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 50,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-148",
    "name": "Ma Diệm Thất Sát",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 148,
      "missileId": 58,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        148
      ],
      "skillName": "Ma Diệm Thất Sát",
      "missileName": "七伤神拳",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "addskilldamage1",
        "fatallystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 384,
    "radius": 128,
    "form": {
      "shape": 6,
      "generate": 1,
      "gap": 0
    },
    "zone": {
      "life": 0.056,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [
      "chí mạng ngẫu nhiên (sinh tồn không có chí mạng)"
    ],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 384px, bán kính 128px (4 ô DmgRange). Không giới hạn binh khí. Giản lược trong sinh tồn: chí mạng ngẫu nhiên (sinh tồn không có chí mạng). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 384,
      "cells": 4,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-150",
    "name": "Thiên Ma Giải Thể",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 150,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        150
      ],
      "skillName": "Thiên Ma Giải Thể",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "adddefense_v",
        "attackratingenhance_p",
        "addfiremagic_v",
        "addfiredamage_v",
        "fireenhance_p",
        "attackspeed_yan_v",
        "returnres_p",
        "attackratingenhance_v",
        "skill_cost_v",
        "castspeed_v",
        "lifemax_yan_p",
        "fasthitrecover_yan_v",
        "me2metaldamage_p",
        "metal2medamage_p",
        "anti_block_rate",
        "do_hurt_p",
        "castspeed_yan_v",
        "fastwalkrun_p",
        "allres_yan_p",
        "melee_returnres_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 60,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-151",
    "name": "Võ Đang kiếm pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 151,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        151
      ],
      "skillName": "Võ Đang kiếm pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "attackratingenhance_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-152",
    "name": "Võ Đang quyền pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 152,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        152
      ],
      "skillName": "Võ Đang quyền pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addlightingmagic_v",
        "manashield_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-153",
    "name": "Nộ Lôi Chỉ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 153,
      "missileId": 24,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        153
      ],
      "skillName": "Nộ Lôi Chỉ",
      "missileName": "怒雷指",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 384px, đạn bay 384px (432px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 384,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 16,
      "reach": 384,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-155",
    "name": "Thương Hải Minh Nguyệt",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 155,
      "missileId": 25,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        155
      ],
      "skillName": "Thương Hải Minh Nguyệt",
      "missileName": "沧海明月",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "lightingdamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 384px, đạn bay 384px (432px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 384,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 16,
      "reach": 384,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-157",
    "name": "Tọa Vọng Vô Ngã",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 157,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        157
      ],
      "skillName": "Tọa Vọng Vô Ngã",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "manashield_p",
        "skill_cost_v",
        "do_stun_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 50,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-158",
    "name": "Kiếm Phi Kinh Thiên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 158,
      "missileId": 26,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        158
      ],
      "skillName": "Kiếm Phi Kinh Thiên",
      "missileName": "天际惊雷",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "lightingdamage_v",
        "addskilldamage1",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 416,
    "radius": 96,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.889,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 416px, bán kính 96px (3 ô DmgRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 416,
      "cells": 3,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-159",
    "name": "Thất Tinh Trận",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 159,
      "missileId": 92,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        159,
        211
      ],
      "skillName": "Thất Tinh Trận",
      "missileName": "友好光环传递子弹",
      "match": "exact",
      "style": 2,
      "attrs": [
        "attackratingenhance_p",
        "adddefense_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 3,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 20,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-164",
    "name": "Bác Cấp Nhi Phục",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 164,
      "missileId": 28,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        164
      ],
      "skillName": "Bác Cấp Nhi Phục",
      "missileName": "剥及而复",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_v",
        "stun_p",
        "addskilldamage1",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 15,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 416,
    "radius": 128,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.667,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 416px, bán kính 128px (4 ô DmgRange). Không giới hạn binh khí. Hiệu ứng nguồn: 55% làm choáng 1,111 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 416,
      "cells": 4,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "stun": {
      "chance": 0.55,
      "dur": 1.111,
      "from": "164:20"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-165",
    "name": "Vô Ngã Vô Kiếm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 165,
      "missileId": 29,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        165
      ],
      "skillName": "Vô Ngã Vô Kiếm",
      "missileName": "无我无剑",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "stun_p",
        "seriesdamage_p",
        "skill_misslenum_v",
        "addskilldamage2"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 16,
      "form": 2,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 1760,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 2,
      "generate": 1,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 8,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "8 đạn đúng nguồn, tổng 1760; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Hiệu ứng nguồn: 20% làm choáng 0,556 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 1
    },
    "stun": {
      "chance": 0.2,
      "dur": 0.556,
      "from": "165:20"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-166",
    "name": "Thái Cực Thần Công",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 166,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        166
      ],
      "skillName": "Thái Cực Thần Công",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "attackspeed_v",
        "castspeed_v",
        "addlightingdamage_v",
        "attackratingenhance_v",
        "manareplenish_v",
        "lightingenhance_p",
        "manamax_p",
        "manamax_yan_p",
        "deadlystrikeenhance_p",
        "me2waterdamage_p",
        "water2medamage_p",
        "anti_block_rate",
        "anti_enhancehit_rate",
        "fasthitrecover_yan_v",
        "manamax_yan_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-167",
    "name": "Côn Lôn đao pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 167,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        167
      ],
      "skillName": "Côn Lôn đao pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-168",
    "name": "Côn Lôn kiếm pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 168,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        168
      ],
      "skillName": "Côn Lôn kiếm pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addlightingmagic_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-169",
    "name": "Hô Phong Pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 169,
      "missileId": 14,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        169
      ],
      "skillName": "Hô Phong Pháp",
      "missileName": "疾风咒",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "lightingdamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 384,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 1
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 384px, đạn bay 360px (432px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 360,
    "sourceReach": {
      "attackRadius": 384,
      "speedPerFrame": 24,
      "lifeFrames": 15,
      "reach": 360,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-171",
    "name": "Thanh Phong phù",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 171,
      "missileId": 19,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        171
      ],
      "skillName": "Thanh Phong phù",
      "missileName": "清风符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "fastwalkrun_p",
        "skill_cost_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 10,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-172",
    "name": "Thiên Tế Tấn Lôi",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 172,
      "missileId": 15,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        172
      ],
      "skillName": "Thiên Tế Tấn Lôi",
      "missileName": "迅雷咒",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage1",
        "addskilldamage2"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 448,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 504,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 185,
    "desc": "1 đạn đúng nguồn, tổng 185; một người nhận tối đa 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 448px, đạn bay 448px (504px/giây), va chạm 32px (1 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 448,
    "sourceReach": {
      "attackRadius": 448,
      "speedPerFrame": 28,
      "lifeFrames": 16,
      "reach": 448,
      "collidCells": 1
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-173",
    "name": "Thiên Thanh Địa Trọc",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 173,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        173
      ],
      "skillName": "Thiên Thanh Địa Trọc",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "lightingres_yan_p",
        "fireres_yan_p",
        "skill_cost_v",
        "physicsres_yan_p",
        "coldres_yan_p",
        "addskilldamage1",
        "addskilldamage2"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-174",
    "name": "Ki Bán phù",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 174,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        174
      ],
      "skillName": "Ki Bán phù",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "fastwalkrun_p",
        "skill_cost_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 20,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-175",
    "name": "Khi Hàn Ngạo Tuyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 175,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        175
      ],
      "skillName": "Khi Hàn Ngạo Tuyết",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "castspeed_v",
        "skill_cost_v",
        "attackspeed_yan_v",
        "castspeed_yan_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 40,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-178",
    "name": "Nhất Khí Tam Thanh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 178,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        178
      ],
      "skillName": "Nhất Khí Tam Thanh",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "deadlystrikeenhance_p",
        "skill_cost_v"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-179",
    "name": "Cuồng Lôi Chấn Địa",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 179,
      "missileId": 17,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        179
      ],
      "skillName": "Cuồng Lôi Chấn Địa",
      "missileName": "狂雷震地",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_v",
        "addskilldamage1",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 15,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 352,
    "radius": 64,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.222,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 352px, bán kính 64px (2 ô DmgRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 352,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-181",
    "name": "Khí Tâm phù",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 181,
      "missileId": 22,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        181
      ],
      "skillName": "Khí Tâm phù",
      "missileName": "弃心符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "stun_p",
        "skill_cost_v",
        "anti_block_rate_buff"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 40,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-249",
    "name": "Tiểu Lý Phi Đao",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 249,
      "missileId": 106,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        249
      ],
      "skillName": "Tiểu Lý Phi Đao",
      "missileName": "小李飞刀",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "addskilldamage1",
        "skill_cost_v",
        "poisondamage_v",
        "seriesdamage_p",
        "skill_dohurt",
        "addskilldamage2"
      ],
      "equipment": 101,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.throw",
    "range": 480,
    "radius": 64,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.056,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": false
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 0.056 giây, nổ khi kẻ địch chạm vào, gây 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 480px, bán kính 64px (2 ô CollidRange). Ngũ hành: trúng độc 44 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 480,
      "cells": 2,
      "cellPx": 32,
      "from": "CollidRange"
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 44,
      "from": "249:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-252",
    "name": "Phật Pháp Vô Biên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 252,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        252
      ],
      "skillName": "Phật Pháp Vô Biên",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addcoldmagic_v",
        "addcolddamage_v",
        "attackspeed_v",
        "castspeed_v",
        "coldenhance_p",
        "lifemax_yan_p",
        "fasthitrecover_yan_v",
        "me2firedamage_p",
        "fire2medamage_p",
        "anti_block_rate",
        "fatallystrikeres_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-267",
    "name": "Tam Hoàn Thao Nguyệt",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 267,
      "missileId": 110,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        267
      ],
      "skillName": "Tam Hoàn Thao Nguyệt",
      "missileName": "三环套月子弹",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "attackrating_p",
        "deadlystrike_p",
        "stun_p",
        "lightingdamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 3,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 78,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 6
    },
    "pierce": true,
    "simplifications": [],
    "count": 3,
    "speed": 468,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "3 đạn đúng nguồn, tổng 220; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 78px, đạn bay 104px (468px/giây), va chạm 32px (1 ô CollidRange). Hiệu ứng nguồn: 10% làm choáng 0,556 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 104,
    "sourceReach": {
      "attackRadius": 78,
      "speedPerFrame": 26,
      "lifeFrames": 4,
      "reach": 104,
      "collidCells": 1
    },
    "stun": {
      "chance": 0.1,
      "dur": 0.556,
      "from": "267:20"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-269",
    "name": "Băng Tâm Trái ảnh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 269,
      "missileId": 111,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        269
      ],
      "skillName": "Băng Tâm Trái ảnh",
      "missileName": "冰心倩影",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lifereplenish_v",
        "skill_cost_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 20,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-271",
    "name": "Long Trảo Hổ Trảo",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 271,
      "missileId": 113,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        271,
        272
      ],
      "skillName": "Long Trảo Hổ Trảo",
      "missileName": "龙爪虎抓子弹",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "ignoredefense_p",
        "skill_cost_v",
        "stun_p",
        "deadlystrike_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "addskilldamage2",
        "colddamage_v",
        "addskilldamage3",
        "addskilldamage4",
        "addskilldamage5",
        "addskilldamage6"
      ],
      "equipment": -1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {
        "AnimFile4": "missing-in-client"
      }
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 50,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 3,
    "weaponAny": false,
    "weapon": "quyen",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.palm",
    "range": 78,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 468,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "1 đạn đúng nguồn, tổng 220; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 78px, đạn bay 104px (468px/giây), va chạm 32px (1 ô CollidRange). Hiệu ứng nguồn: 5% làm choáng 0,278 giây, bỏ qua 85% giáp (loại phòng thủ chưa xác minh). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 2 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 104,
    "sourceReach": {
      "attackRadius": 78,
      "speedPerFrame": 26,
      "lifeFrames": 4,
      "reach": 104,
      "collidCells": 1
    },
    "stun": {
      "chance": 0.05,
      "dur": 0.278,
      "from": "271:20"
    },
    "armorPierce": 0.85,
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "271:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-273",
    "name": "Như Lai Thiên Diệp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 273,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        273
      ],
      "skillName": "Như Lai Thiên Diệp",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "addphysicsdamage_p",
        "coldenhance_p",
        "addcolddamage_v",
        "deadlystrikeenhance_p",
        "attackspeed_v",
        "skill_cost_v",
        "me2wooddamage_p",
        "wood2medamage_p",
        "fastwalkrun_p",
        "fasthitrecover_yan_v",
        "anti_hitrecover"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "missing-in-client",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 60,
    "sourceRole": "support",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-275",
    "name": "Sương Ngạo Côn Lôn",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 275,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        275
      ],
      "skillName": "Sương Ngạo Côn Lôn",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "attackspeed_v",
        "deadlystrikeenhance_p",
        "castspeed_v",
        "addlightingmagic_v",
        "addlightingdamage_v",
        "lifemax_yan_p",
        "me2waterdamage_p",
        "water2medamage_p",
        "lifemax_yan_v",
        "anti_block_rate",
        "fasthitrecover_yan_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-277",
    "name": "Hoạt Bất Lưu Thủ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 277,
      "missileId": 114,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        277
      ],
      "skillName": "Hoạt Bất Lưu Thủ",
      "missileName": "滑不留手子弹",
      "match": "exact",
      "style": 0,
      "attrs": [
        "fastwalkrun_p",
        "skill_cost_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 40,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-282",
    "name": "Thanh Âm Phạn Xướng",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 282,
      "missileId": 92,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        282,
        281
      ],
      "skillName": "Thanh Âm Phạn Xướng",
      "missileName": "友好光环传递子弹",
      "match": "exact",
      "style": 2,
      "attrs": [
        "fasthitrecover_v",
        "freezetimereduce_p",
        "poisontimereduce_p",
        "stuntimereduce_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 3,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 60,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-303",
    "name": "Độc Thích Cốt",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 303,
      "missileId": 127,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        303
      ],
      "skillName": "Độc Thích Cốt",
      "missileName": "毒刺骨",
      "match": "exact",
      "style": 0,
      "attrs": [
        "poisondamage_v",
        "skill_cost_v",
        "seriesdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 15,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 20,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.slash",
    "range": 64,
    "radius": 64,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 30,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 30 giây, nổ khi kẻ địch chạm vào, gây 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 64px (2 ô DmgRange). Không giới hạn binh khí. Ngũ hành: trúng độc 37 sát thương trong 5,556 giây (thời gian theo nguồn, tổng là luật Sinh tồn); nhánh con khi trúng: trúng độc. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 50,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "poison": {
      "dur": 5.556,
      "every": 0.556,
      "ticks": 10,
      "total": 37,
      "from": "303:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "branchEffects": {
      "304:1": {
        "event": "collide",
        "poison": {
          "dur": 5.556,
          "every": 0.556,
          "ticks": 10,
          "total": 37,
          "from": "304:1",
          "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-318",
    "name": "Đạt Ma Độ Giang",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 318,
      "missileId": 134,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        318,
        317
      ],
      "skillName": "Đạt Ma Độ Giang",
      "missileName": "金佛出击",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "skill_cost_v",
        "deadlystrike_p",
        "addskillexp1",
        "skill_skillexp_v",
        "missle_speed_v",
        "skill_attackradius",
        "seriesdamage_p",
        "ignoredefense_p",
        "colddamage_v",
        "addskilldamage1",
        "addskilldamage2"
      ],
      "equipment": -1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "quyen",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.palm",
    "range": 90,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 540,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "1 đạn đúng nguồn, tổng 250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 90px, đạn bay 120px (540px/giây), va chạm 32px (1 ô CollidRange). Hiệu ứng nguồn: bỏ qua 90% giáp (loại phòng thủ chưa xác minh). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 120,
    "sourceReach": {
      "attackRadius": 90,
      "speedPerFrame": 30,
      "lifeFrames": 4,
      "reach": 120,
      "collidCells": 1
    },
    "armorPierce": 0.9,
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "318:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-319",
    "name": "Hoành Tảo Thiên Quân",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 319,
      "missileId": 135,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        319
      ],
      "skillName": "Hoành Tảo Thiên Quân",
      "missileName": "横扫千军",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "skill_cost_v",
        "deadlystrike_p",
        "skill_attackradius",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "attackrating_p",
        "colddamage_v",
        "addskilldamage1",
        "addskilldamage2"
      ],
      "equipment": 2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "con",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.thrust",
    "range": 192,
    "radius": 192,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.278,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 192px (6 ô DmgRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 128,
      "cells": 6,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "319:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-321",
    "name": "Vô Tướng Trảm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 321,
      "missileId": 136,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        321
      ],
      "skillName": "Vô Tướng Trảm",
      "missileName": "无相斩",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "skill_cost_v",
        "addskillexp1",
        "skill_skillexp_v",
        "missle_speed_v",
        "skill_attackradius",
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage1"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 2,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 9
    },
    "pierce": true,
    "simplifications": [],
    "count": 2,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "2 đạn đúng nguồn, tổng 250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "321:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-324",
    "name": "Thừa Long Quyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 324,
      "missileId": 140,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        324,
        407
      ],
      "skillName": "Thừa Long Quyết",
      "missileName": "乘龙诀",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "ignoredefense_p",
        "addskilldamage2",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": 4,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=4 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=4 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-325",
    "name": "Truy Phong Quyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 325,
      "missileId": 141,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        325,
        408
      ],
      "skillName": "Truy Phong Quyết",
      "missileName": "追风诀",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "skill_skillexp_v",
        "deadlystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "addskillexp1",
        "skill_attackradius",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "ignoredefense_p",
        "addskilldamage1",
        "addskilldamage2"
      ],
      "equipment": 4,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 3,
      "form": 2,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=4 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=4 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-328",
    "name": "Tam Nga Tề Tuyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 328,
      "missileId": 142,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        328
      ],
      "skillName": "Tam Nga Tề Tuyết",
      "missileName": "三峨霁雪飞剑",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "colddamage_v",
        "deadlystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_startevent",
        "skill_showevent",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "addskilldamage1"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 3,
      "form": 0,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 750,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 0,
      "generate": 5,
      "gap": 1
    },
    "pierce": true,
    "simplifications": [],
    "count": 3,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "3 đạn đúng nguồn, tổng 750; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "328:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-332",
    "name": "Phổ Độ Chúng Sinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 332,
      "missileId": 137,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        332,
        333
      ],
      "skillName": "Phổ Độ Chúng Sinh",
      "missileName": "友好光环超大范围传递子弹",
      "match": "exact",
      "style": 2,
      "attrs": [
        "lifereplenish_v",
        "manareplenish_v",
        "allres_yan_p",
        "fasthitrecover_yan_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 3,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 80,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-336",
    "name": "Băng Tung Vô ảnh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 336,
      "missileId": 146,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        336
      ],
      "skillName": "Băng Tung Vô ảnh",
      "missileName": "冰踪无影",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "colddamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_collideevent",
        "skill_showevent",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "skill_misslenum_v",
        "addskilldamage1",
        "addskilldamage2"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 5,
      "form": 2,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 1250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 2,
      "generate": 0,
      "gap": 1
    },
    "pierce": false,
    "simplifications": [],
    "count": 5,
    "speed": 432,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "5 đạn đúng nguồn, tổng 1250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 576px (432px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 576,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 24,
      "lifeFrames": 24,
      "reach": 576,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "336:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "382:20": {
        "event": "collide",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "382:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-337",
    "name": "Băng Tâm Tiên Tử",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 337,
      "missileId": 147,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        337
      ],
      "skillName": "Băng Tâm Tiên Tử",
      "missileName": "冰心仙子",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsdamage_v",
        "colddamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_flyevent",
        "skill_showevent",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "addskilldamage1",
        "addskilldamage2"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "1 đạn đúng nguồn, tổng 250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "337:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "338:20": {
        "event": "fly",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "338:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-339",
    "name": "Nhiếp Hồn Nguyệt ảnh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 339,
      "missileId": 149,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        339
      ],
      "skillName": "Nhiếp Hồn Nguyệt ảnh",
      "missileName": "慑魂月影",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_collideevent",
        "skill_showevent",
        "missle_speed_v",
        "skill_attackradius",
        "addskillexp1",
        "skill_skillexp_v",
        "poisondamage_v",
        "seriesdamage_p",
        "addskilldamage1"
      ],
      "equipment": 101,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.throw",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 5
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "Đạn nguồn 149: tốc 576px/giây, tầm 512px. Trúng ai thì nổ Ngân Đao Xạ Nguyệt (cấp 20, bán kính 3 ô ≈ 96px, 2 nhịp/0.889 giây). Một người nhận tối đa 250 sát thương gốc, chia giữa đạn và vụ nổ theo tỷ lệ physicsenhance_p của nguồn. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: trúng độc 50 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 1
    },
    "sourceFlight": {
      "missileId": 149,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "attackRadius": 512
    },
    "burst": {
      "skillId": 340,
      "name": "Ngân Đao Xạ Nguyệt",
      "level": 20,
      "missileId": 150,
      "cells": 3,
      "radius": 96,
      "life": 0.889,
      "every": 0.444,
      "pulses": 2,
      "enhance": 183,
      "chain": null,
      "dmg": 68.59,
      "main": 112.82
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 50,
      "from": "339:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-341",
    "name": "Tán Hoa Tiêu",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 341,
      "missileId": 151,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        341
      ],
      "skillName": "Tán Hoa Tiêu",
      "missileName": "散花镖",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "addskilldamage1",
        "poisondamage_v",
        "skill_cost_v",
        "missle_speed_v",
        "skill_attackradius",
        "addskilldamage2",
        "seriesdamage_p",
        "addskilldamage3",
        "addskilldamage4"
      ],
      "equipment": 100,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 5,
      "form": 2,
      "moveKind": 100,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 1100,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.throw",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 2,
      "generate": 1,
      "gap": 3
    },
    "pierce": true,
    "simplifications": [],
    "count": 5,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "5 đạn đúng nguồn, tổng 1100; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 1024px (576px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: trúng độc 44 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 1024,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 32,
      "reach": 1024,
      "collidCells": 1
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 44,
      "from": "341:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-342",
    "name": "Cửu Cung Phi Tinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 342,
      "missileId": 152,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        342
      ],
      "skillName": "Cửu Cung Phi Tinh",
      "missileName": "九宫飞星",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "poisondamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "addskilldamage1",
        "addskilldamage2",
        "addskilldamage3"
      ],
      "equipment": 100,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 5,
      "form": 2,
      "moveKind": 100,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 1250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.throw",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 2,
      "generate": 5,
      "gap": 2
    },
    "pierce": false,
    "simplifications": [],
    "count": 5,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "5 đạn đúng nguồn, tổng 1250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 1024px (576px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: trúng độc 50 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 1024,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 32,
      "reach": 1024,
      "collidCells": 1
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 50,
      "from": "342:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-343",
    "name": "Xuyên Tâm Thích",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 343,
      "missileId": 153,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        343
      ],
      "skillName": "Xuyên Tâm Thích",
      "missileName": "穿心刺",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsdamage_v",
        "skill_cost_v",
        "seriesdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 15,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.slash",
    "range": 64,
    "radius": 64,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 30,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 30 giây, nổ khi kẻ địch chạm vào, gây 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 64px (2 ô DmgRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 50,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-345",
    "name": "Hàn Băng Thích",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 345,
      "missileId": 155,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        345
      ],
      "skillName": "Hàn Băng Thích",
      "missileName": "寒冰刺",
      "match": "exact",
      "style": 0,
      "attrs": [
        "colddamage_v",
        "skill_cost_v",
        "seriesdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 15,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 40,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.slash",
    "range": 64,
    "radius": 64,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 30,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 30 giây, nổ khi kẻ địch chạm vào, gây 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 64px (2 ô DmgRange). Không giới hạn binh khí. Ngũ hành: băng sát làm chậm 25% trong 1 giây (thời gian theo nguồn, mức chậm là luật Sinh tồn); nhánh con khi trúng: băng sát. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 50,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 1,
      "from": "345:20",
      "rule": "thời gian từ nguồn; mức chậm 25% là luật Sinh tồn"
    },
    "branchEffects": {
      "346:1": {
        "event": "collide",
        "cold": {
          "k": 0.25,
          "dur": 0.056,
          "sourceTime": 0.056,
          "from": "346:1",
          "rule": "thời gian từ nguồn; mức chậm 25% là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-347",
    "name": "Địa Diệm Hỏa",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 347,
      "missileId": 157,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        347
      ],
      "skillName": "Địa Diệm Hỏa",
      "missileName": "地焰火",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "skill_cost_v",
        "seriesdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 15,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.slash",
    "range": 64,
    "radius": 64,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 30,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 30 giây, nổ khi kẻ địch chạm vào, gây 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 64px (2 ô DmgRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 50,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-349",
    "name": "Lôi Kích Thuật",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 349,
      "missileId": 159,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        349
      ],
      "skillName": "Lôi Kích Thuật",
      "missileName": "雷击术",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_v",
        "stun_p",
        "skill_cost_v",
        "seriesdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 15,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 50,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.slash",
    "range": 64,
    "radius": 64,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 30,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 30 giây, nổ khi kẻ địch chạm vào, gây 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 64px (2 ô DmgRange). Không giới hạn binh khí. Hiệu ứng nguồn: 20% làm choáng 1,111 giây. Ngũ hành: nhánh con khi trúng: 1% choáng 0,056 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 50,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "stun": {
      "chance": 0.2,
      "dur": 1.111,
      "from": "349:20"
    },
    "branchEffects": {
      "350:1": {
        "event": "collide",
        "stun": {
          "chance": 0.01,
          "dur": 0.056,
          "from": "350:1"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-351",
    "name": "Loạn Hoàn Kích",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 351,
      "missileId": 161,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        351
      ],
      "skillName": "Loạn Hoàn Kích",
      "missileName": "乱环击",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "poisondamage_v",
        "physicsdamage_v",
        "colddamage_v",
        "lightingdamage_v",
        "stun_p",
        "skill_cost_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 15,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.slash",
    "range": 64,
    "radius": 64,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 60,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 60 giây, nổ khi kẻ địch chạm vào, gây 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 64px (2 ô DmgRange). Không giới hạn binh khí. Hiệu ứng nguồn: 20% làm choáng 1,111 giây. Ngũ hành: trúng độc 50 sát thương trong 2,778 giây (thời gian theo nguồn, tổng là luật Sinh tồn); băng sát làm chậm 25% trong 1 giây (thời gian theo nguồn, mức chậm là luật Sinh tồn); nhánh con khi trúng: 1% choáng 0,056 giây, trúng độc, băng sát. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 50,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "stun": {
      "chance": 0.2,
      "dur": 1.111,
      "from": "351:20"
    },
    "poison": {
      "dur": 2.778,
      "every": 0.556,
      "ticks": 5,
      "total": 50,
      "from": "351:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 1,
      "from": "351:20",
      "rule": "thời gian từ nguồn; mức chậm 25% là luật Sinh tồn"
    },
    "branchEffects": {
      "352:1": {
        "event": "collide",
        "stun": {
          "chance": 0.01,
          "dur": 0.056,
          "from": "352:1"
        },
        "poison": {
          "dur": 2.778,
          "every": 0.556,
          "ticks": 5,
          "total": 50,
          "from": "352:1",
          "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
        },
        "cold": {
          "k": 0.25,
          "dur": 0.056,
          "sourceTime": 0.056,
          "from": "352:1",
          "rule": "thời gian từ nguồn; mức chậm 25% là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-356",
    "name": "Xuyên Y Phá Giáp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 356,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        356
      ],
      "skillName": "Xuyên Y Phá Giáp",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsres_yan_p",
        "skill_cost_v",
        "physicsresmax_p",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 40,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-360",
    "name": "Tiêu Diêu Công",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 360,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        360
      ],
      "skillName": "Tiêu Diêu Công",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "attackspeed_v",
        "castspeed_v",
        "addphysicsdamage_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-361",
    "name": "Vân Long Kích",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 361,
      "missileId": 169,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        361
      ],
      "skillName": "Vân Long Kích",
      "missileName": "云龙击",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "firedamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "deadlystrike_p",
        "addskilldamage1",
        "addskillexp1",
        "skill_skillexp_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "steallife_p",
        "stealmana_p"
      ],
      "equipment": 3,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "missing-in-client",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "thuong",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 90,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 540,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "1 đạn đúng nguồn, tổng 250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 90px, đạn bay 120px (540px/giây), va chạm 32px (1 ô CollidRange). Hiệu ứng nguồn: hút 16% sinh lực, hút 16% nội lực (×0,1 là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 120,
    "sourceReach": {
      "attackRadius": 90,
      "speedPerFrame": 30,
      "lifeFrames": 4,
      "reach": 120,
      "collidCells": 1
    },
    "drain": {
      "life": 0.16,
      "mana": 0.16
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-362",
    "name": "Thiên Ngoại Lưu Tinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 362,
      "missileId": 171,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        362
      ],
      "skillName": "Thiên Ngoại Lưu Tinh",
      "missileName": "天外流星",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_vanishedevent",
        "skill_showevent",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "addskilldamage1"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 320,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 480,
    "radius": 32,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.778,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": false
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 0.778 giây, nổ khi kẻ địch chạm vào, gây 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 480px, bán kính 32px (1 ô CollidRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 480,
      "cells": 1,
      "cellPx": 32,
      "from": "CollidRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-364",
    "name": "Bi Tô Thanh Phong",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 364,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        364
      ],
      "skillName": "Bi Tô Thanh Phong",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "fasthitrecover_v",
        "skill_cost_v",
        "fasthitrecover_yan_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 40,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-365",
    "name": "Thiên Địa Vô Cực",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 365,
      "missileId": 173,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        365
      ],
      "skillName": "Thiên Địa Vô Cực",
      "missileName": "天地无极本身",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_v",
        "skill_attackradius",
        "skill_cost_v",
        "stun_p",
        "addskilldamage1",
        "missle_lifetime_v",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 15,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 512,
    "radius": 128,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 1.111,
      "every": 0.222,
      "pulses": 5,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 1.111 giây, gây sát thương mỗi 0.222 giây (5 nhịp); một người nhận tối đa 250 sát thương gốc. Tầm nguồn: đặt xa 512px, bán kính 128px (4 ô DmgRange). Không giới hạn binh khí. Hiệu ứng nguồn: 20% làm choáng 0,333 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 512,
      "cells": 4,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "stun": {
      "chance": 0.2,
      "dur": 0.333,
      "from": "365:20"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-372",
    "name": "Ngạo Tuyết Tiêu Phong",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 372,
      "missileId": 178,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        372
      ],
      "skillName": "Ngạo Tuyết Tiêu Phong",
      "missileName": "傲雪啸风",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "lightingdamage_v",
        "skill_collideevent",
        "skill_showevent",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "stun_p",
        "addskilldamage1"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "1 đạn đúng nguồn, tổng 250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 32px (1 ô CollidRange). Hiệu ứng nguồn: 25% làm choáng 0,667 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 1
    },
    "stun": {
      "chance": 0.25,
      "dur": 0.667,
      "from": "372:20"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-375",
    "name": "Lôi động Cửu Thiên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 375,
      "missileId": 181,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        375
      ],
      "skillName": "Lôi động Cửu Thiên",
      "missileName": "雷动九天",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_v",
        "skill_eventskilllevel",
        "skill_collideevent",
        "skill_showevent",
        "skill_cost_v",
        "addskillexp1",
        "skill_skillexp_v",
        "seriesdamage_p",
        "addskilldamage1"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 4,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 470,
    "radius": 64,
    "form": {
      "shape": 6,
      "generate": 3,
      "gap": 5
    },
    "zone": {
      "life": 0.667,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": false
    },
    "simplifications": [],
    "desc": "Bẫy nguồn: nằm 0.667 giây, nổ khi kẻ địch chạm vào, gây 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 470px, bán kính 64px (2 ô CollidRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 470,
      "cells": 2,
      "cellPx": 32,
      "from": "CollidRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-380",
    "name": "Phong Sương Toái ảnh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 380,
      "missileId": 186,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        380
      ],
      "skillName": "Phong Sương Toái ảnh",
      "missileName": "风霜碎影",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "colddamage_v",
        "skill_eventskilllevel",
        "skill_startevent",
        "skill_showevent",
        "skill_cost_v",
        "addskilldamage1",
        "addskillexp1",
        "skill_skillexp_v",
        "addskilldamage2"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 400,
    "radius": 96,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.667,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 400px, bán kính 96px (3 ô DmgRange). Không giới hạn binh khí. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 400,
      "cells": 3,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "380:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "331:20": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "331:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-384",
    "name": "Bách Độc Xuyên Tâm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 384,
      "missileId": 190,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        384
      ],
      "skillName": "Bách Độc Xuyên Tâm",
      "missileName": "百毒穿心",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "poisondamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 3,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 448,
    "radius": 65,
    "form": {
      "shape": 7,
      "generate": 1,
      "gap": 5
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 504,
    "width": 96,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 185,
    "desc": "1 đạn đúng nguồn, tổng 185; một người nhận tối đa 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 448px, đạn bay 672px (504px/giây), va chạm 96px (3 ô CollidRange). Không giới hạn binh khí. Ngũ hành: trúng độc 37 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 672,
    "sourceReach": {
      "attackRadius": 448,
      "speedPerFrame": 28,
      "lifeFrames": 24,
      "reach": 672,
      "collidCells": 3
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 37,
      "from": "384:20",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-385",
    "name": "Thôi Song Vọng Nguyệt",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 385,
      "missileId": 191,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        385
      ],
      "skillName": "Thôi Song Vọng Nguyệt",
      "missileName": "推窗望月",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "colddamage_v",
        "deadlystrike_p",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 448,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 20
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 504,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 185,
    "desc": "1 đạn đúng nguồn, tổng 185; một người nhận tối đa 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 448px, đạn bay 448px (504px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 448,
    "sourceReach": {
      "attackRadius": 448,
      "speedPerFrame": 28,
      "lifeFrames": 16,
      "reach": 448,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "385:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-390",
    "name": "Đoạn Cân Hủ Cốt",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 390,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        390
      ],
      "skillName": "Đoạn Cân Hủ Cốt",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "allres_yan_p",
        "skill_cost_v",
        "allresmax_p",
        "anti_block_rate_buff"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 80,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-391",
    "name": "Nhiếp Hồn Loạn Tâm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 391,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        391
      ],
      "skillName": "Nhiếp Hồn Loạn Tâm",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "attackratingenhance_p",
        "adddefense_v",
        "addphysicsdamage_p",
        "fasthitrecover_v",
        "lifereplenish_v",
        "deadlystrikeenhance_p",
        "skill_cost_v",
        "fasthitrecover_yan_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 80,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-392",
    "name": "Thúc Phược Chú",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 392,
      "missileId": 290,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        392
      ],
      "skillName": "Thúc Phược Chú",
      "missileName": "束缚咒",
      "match": "exact",
      "style": 0,
      "attrs": [
        "rangedamagereturn_p",
        "skill_cost_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 10,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-394",
    "name": "Túy Tiên Tá Cốt",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 394,
      "missileId": 20,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        394
      ],
      "skillName": "Túy Tiên Tá Cốt",
      "missileName": "羁绊符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "freezetimereduce_p",
        "stuntimereduce_p",
        "lifereplenish_v",
        "manareplenish_v",
        "rangedamagereturn_p",
        "skill_cost_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "anti_block_rate_buff",
        "skill_mintimepercastonhorse_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "missing-in-client",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 80,
    "sourceRole": "support",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-630",
    "name": "Huyền Thiên Vô Cực",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 630,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        630
      ],
      "skillName": "Huyền Thiên Vô Cực",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "dynamicmagicshield_v",
        "returnres_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-708",
    "name": "Đảo Hư Thiên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 708,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        708
      ],
      "skillName": "Đảo Hư Thiên",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "allres_p",
        "allresmax_p",
        "lifereplenish_p",
        "ignoreskill_p",
        "skill_skillexp_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-709",
    "name": "Đại Thừa Như Lai Chú",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 709,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        709
      ],
      "skillName": "Đại Thừa Như Lai Chú",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "poisondamagereturn_p",
        "returnskill_p",
        "autoreplyskill",
        "skill_skillexp_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-710",
    "name": "Mê ảnh Tung",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 710,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        710
      ],
      "skillName": "Mê ảnh Tung",
      "missileName": null,
      "match": "exact",
      "style": 1,
      "attrs": [
        "skill_cost_v",
        "skill_param1_v",
        "skill_mintimepercastonhorse_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "skill_skillexp_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 13,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 120,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-712",
    "name": "Bế Nguyệt Phất Trần",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 712,
      "missileId": 92,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        712,
        718
      ],
      "skillName": "Bế Nguyệt Phất Trần",
      "missileName": "友好光环传递子弹",
      "match": "exact",
      "style": 2,
      "attrs": [
        "skill_appendskill",
        "skill_appendskill",
        "skill_appendskill",
        "skill_appendskill",
        "skill_appendskill",
        "skill_desc",
        "skill_skillexp_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 3,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "source-logic-unresolved",
        "text": "Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 120,
    "sourceRole": "support",
    "sourceIncomplete": true,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-713",
    "name": "Ngự Tuyết ẩn",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 713,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        713
      ],
      "skillName": "Ngự Tuyết ẩn",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "skill_cost_v",
        "hide",
        "skill_mintimepercast_v",
        "skill_mintimepercastonhorse_v",
        "skill_desc",
        "skill_skillexp_v",
        "fastwalkrun_p",
        "enhancehiteffect_rate",
        "cast_when_buff_removed",
        "skill_eventskilllevel",
        "skill_showevent",
        "cast_when_buff_removed1"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 120,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-714",
    "name": "Hỗn Thiên Khí Công",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 714,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        714
      ],
      "skillName": "Hỗn Thiên Khí Công",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "autoattackskill",
        "skill_desc",
        "skill_skillexp_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-715",
    "name": "Ma Âm Phệ Phách",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 715,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        715
      ],
      "skillName": "Ma Âm Phệ Phách",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "skill_cost_v",
        "autodeathskill",
        "skill_mintimepercastonhorse_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "skill_skillexp_v",
        "anti_block_rate_buff"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "source-logic-unresolved",
        "text": "Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 120,
    "sourceRole": "support",
    "sourceIncomplete": true,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-716",
    "name": "Xuất ứ Bất Nhiễm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 716,
      "missileId": 274,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        716
      ],
      "skillName": "Xuất ứ Bất Nhiễm",
      "missileName": "原地友方范围",
      "match": "exact",
      "style": 0,
      "attrs": [
        "skill_cost_v",
        "missle_missrate",
        "skill_mintimepercastonhorse_v",
        "skill_mintimepercast_v",
        "skill_desc",
        "skill_skillexp_v",
        "ignorenegativestate_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 2,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 120,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-717",
    "name": "Lưỡng Nghi Chân Khí",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 717,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        717
      ],
      "skillName": "Lưỡng Nghi Chân Khí",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "autorescueskill",
        "skill_desc",
        "skill_skillexp_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1055",
    "name": "Đại Lực Kim Cang Chưởng",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1055,
      "missileId": 345,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1055,
        1083
      ],
      "skillName": "Đại Lực Kim Cang Chưởng",
      "missileName": "龙乘般若手",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "skill_cost_v",
        "deadlystrike_p",
        "skill_skillexp_v",
        "missle_speed_v",
        "skill_attackradius",
        "seriesdamage_p",
        "ignoredefense_p",
        "colddamage_v",
        "stun_p",
        "anti_block_rate",
        "skill_misslenum_v"
      ],
      "equipment": -1,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "quyen",
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.palm",
    "range": 180,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [
      "bỏ qua đỡ đòn"
    ],
    "count": 1,
    "speed": 720,
    "width": 96,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "1 đạn đúng nguồn, tổng 330; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 180px, đạn bay 240px (720px/giây), va chạm 96px (3 ô CollidRange). Giản lược trong sinh tồn: bỏ qua đỡ đòn. Hiệu ứng nguồn: 27% làm choáng 0,667 giây, bỏ qua 99% giáp (loại phòng thủ chưa xác minh). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "reach": 240,
    "sourceReach": {
      "attackRadius": 180,
      "speedPerFrame": 40,
      "lifeFrames": 6,
      "reach": 240,
      "collidCells": 3
    },
    "stun": {
      "chance": 0.27,
      "dur": 0.667,
      "from": "1055:27"
    },
    "armorPierce": 0.99,
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1055:27",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1056",
    "name": "Vi Đà Hiến Xử",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1056,
      "missileId": 318,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1056
      ],
      "skillName": "Vi Đà Hiến Xử",
      "missileName": "灭罪渡生",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "skill_cost_v",
        "deadlystrike_p",
        "skill_attackradius",
        "skill_eventskilllevel",
        "skill_skillexp_v",
        "seriesdamage_p",
        "attackrating_p",
        "colddamage_v",
        "skill_startevent",
        "skill_showevent",
        "anti_block_rate",
        "ignoredefense_p"
      ],
      "equipment": 2,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "con",
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.thrust",
    "range": 224,
    "radius": 224,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.556,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [
      "bỏ qua đỡ đòn"
    ],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 224px (7 ô DmgRange). Giản lược trong sinh tồn: bỏ qua đỡ đòn. Hiệu ứng nguồn: bỏ qua 99% giáp (loại phòng thủ chưa xác minh). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "sourceReach": {
      "attackRadius": 180,
      "cells": 7,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "armorPierce": 0.99,
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1056:27",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "1201:20": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "1201:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1057",
    "name": "Tam Giới Quy Thiền",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1057,
      "missileId": 319,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1057
      ],
      "skillName": "Tam Giới Quy Thiền",
      "missileName": "万谛归一",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_startevent",
        "missle_speed_v",
        "skill_attackradius",
        "skill_skillexp_v",
        "seriesdamage_p",
        "colddamage_v",
        "deadlystrike_p"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 0,
          "key": "shaolin",
          "name": "Thiếu Lâm phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 3,
      "form": 2,
      "moveKind": 1,
      "height": 15,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 2,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 990,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 2,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 3,
    "speed": 864,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "3 đạn đúng nguồn, tổng 990; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 576px (864px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "reach": 576,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 48,
      "lifeFrames": 12,
      "reach": 576,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1057:27",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "1085:20": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "1085:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1058",
    "name": "Hào Hùng Trảm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1058,
      "missileId": 320,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1058,
        1084
      ],
      "skillName": "Hào Hùng Trảm",
      "missileName": "豪雄斩子弹",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "seriesdamage_p",
        "deadlystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_skillexp_v",
        "missle_lifetime_v",
        "attackrating_p"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "source-assets-missing",
        "text": "Chuỗi đủ cấp còn thiếu tệp ảnh hoặc âm trong bộ cài."
      },
      {
        "code": "source-logic-unresolved",
        "text": "Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được."
      }
    ],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 2,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "pending",
    "desc": "Chuỗi đủ cấp còn thiếu tệp ảnh hoặc âm trong bộ cài. Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được."
  },
  {
    "id": "vltk-skill-1059",
    "name": "Tung Hoành Bát Hoang",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1059,
      "missileId": 349,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1059,
        1087
      ],
      "skillName": "Tung Hoành Bát Hoang",
      "missileName": "纵横八荒子弹",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "skill_skillexp_v",
        "deadlystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_misslenum_v",
        "skill_cost_v",
        "missle_lifetime_v",
        "seriesdamage_p",
        "ignoredefense_p"
      ],
      "equipment": 4,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 1,
          "key": "tianwang",
          "name": "Thiên Vương Bang"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 5,
      "form": 2,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=4 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=4 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-1062",
    "name": "Băng Vũ Lạc Tinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1062,
      "missileId": 324,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1062
      ],
      "skillName": "Băng Vũ Lạc Tinh",
      "missileName": "紫微冰华",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "colddamage_v",
        "skill_eventskilllevel",
        "skill_startevent",
        "skill_showevent",
        "skill_cost_v",
        "skill_skillexp_v",
        "fatallystrike_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 512,
    "radius": 96,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 2,
      "every": 0.722,
      "pulses": 3,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 2 giây, gây sát thương mỗi 0.722 giây (3 nhịp); một người nhận tối đa 330 sát thương gốc. Tầm nguồn: đặt xa 512px, bán kính 96px (3 ô DmgRange). Không giới hạn binh khí. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "sourceReach": {
      "attackRadius": 512,
      "cells": 3,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1062:27",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "1090:20": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "1090:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1065",
    "name": "Thủy Anh Man Tú",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1065,
      "missileId": 327,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1065
      ],
      "skillName": "Thủy Anh Man Tú",
      "missileName": "冷月落梅",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsdamage_v",
        "colddamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_flyevent",
        "skill_showevent",
        "skill_misslenum_v",
        "skill_skillexp_v",
        "seriesdamage_p",
        "fatallystrike_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 5,
          "key": "cuiyan",
          "name": "Thúy Yên môn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 2,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 5
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 504,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "1 đạn đúng nguồn, tổng 330; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 448px (504px/giây), va chạm 32px (1 ô CollidRange). Không giới hạn binh khí. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát; băng sát. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 2 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "reach": 448,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 28,
      "lifeFrames": 16,
      "reach": 448,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1065:27",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "1102:20": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "1102:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      },
      "1093:20": {
        "event": "fly",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "1093:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1066",
    "name": "Hình Tiêu Cốt Lập",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1066,
      "missileId": 328,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1066
      ],
      "skillName": "Hình Tiêu Cốt Lập",
      "missileName": "形销骨立",
      "match": "exact",
      "style": 0,
      "attrs": [
        "poisondamage_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_skillexp_v",
        "seriesdamage_p",
        "skill_eventskilllevel"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 480,
    "radius": 96,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.722,
      "every": 0.667,
      "pulses": 2,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 0.722 giây, gây sát thương mỗi 0.667 giây (2 nhịp); một người nhận tối đa 330 sát thương gốc. Tầm nguồn: đặt xa 480px, bán kính 96px (3 ô DmgRange). Không giới hạn binh khí. Ngũ hành: nhánh con khi trúng: trúng độc; trúng độc. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "sourceReach": {
      "attackRadius": 480,
      "cells": 3,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "branchEffects": {
      "1094:21": {
        "event": "start",
        "poison": {
          "dur": 3.333,
          "every": 0.556,
          "ticks": 6,
          "total": 66,
          "from": "1094:21",
          "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
        }
      },
      "1096:1": {
        "event": "start",
        "poison": {
          "dur": 3.333,
          "every": 0.556,
          "ticks": 6,
          "total": 66,
          "from": "1096:1",
          "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
        }
      }
    },
    "sourceNotes": [
      {
        "scope": "main",
        "node": "1066:27",
        "name": "poisondamage_v",
        "value": "945,10,0",
        "why": "thời gian 10 / chu kỳ 0 khung; chưa xác minh client đọc số 0 thế nào — không chạy"
      }
    ]
  },
  {
    "id": "vltk-skill-1067",
    "name": "U Hồn Phệ ảnh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1067,
      "missileId": 329,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1067
      ],
      "skillName": "U Hồn Phệ ảnh",
      "missileName": "幽魂噬影",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "poisondamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_misslenum_v",
        "seriesdamage_p",
        "skill_collideevent",
        "skill_showevent",
        "skill_eventskilllevel",
        "skill_skillexp_v"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 3,
          "key": "wudu",
          "name": "Ngũ Độc Giáo"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 3,
      "form": 1,
      "moveKind": 5,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 5
    },
    "pierce": false,
    "simplifications": [],
    "count": 2,
    "speed": 540,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "2 đạn đúng nguồn, tổng 330; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 720px (540px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: trúng độc 66 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn); nhánh con khi trúng: trúng độc. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "reach": 720,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 30,
      "lifeFrames": 24,
      "reach": 720,
      "collidCells": 1
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 66,
      "from": "1067:27",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "branchEffects": {
      "1095:20": {
        "event": "collide",
        "poison": {
          "dur": 3.333,
          "every": 0.556,
          "ticks": 6,
          "total": 66,
          "from": "1095:20",
          "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1069",
    "name": "Vô ảnh Xuyên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1069,
      "missileId": 331,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1069
      ],
      "skillName": "Vô ảnh Xuyên",
      "missileName": "追心锁命",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_collideevent",
        "skill_showevent",
        "missle_speed_v",
        "skill_attackradius",
        "skill_skillexp_v",
        "poisondamage_v",
        "seriesdamage_p"
      ],
      "equipment": 101,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.throw",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 5
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 864,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "Đạn nguồn 331: tốc 864px/giây, tầm 512px. Trúng ai thì nổ Truy Tâm Tỏa Mệnh (cấp 20, bán kính 3 ô ≈ 96px, 4 nhịp/1.722 giây) rồi nổ tiếp Ngân Đao Xạ Nguyệt (cấp 20, bán kính 3 ô ≈ 96px, 2 nhịp/0.889 giây). Một người nhận tối đa 330 sát thương gốc, chia giữa đạn và vụ nổ theo tỷ lệ physicsenhance_p của nguồn. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 528px (864px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: trúng độc 66 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "reach": 528,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 48,
      "lifeFrames": 11,
      "reach": 528,
      "collidCells": 1
    },
    "sourceFlight": {
      "missileId": 331,
      "speedPerFrame": 48,
      "lifeFrames": 11,
      "reach": 528,
      "attackRadius": 512
    },
    "burst": {
      "skillId": 1097,
      "name": "Truy Tâm Tỏa Mệnh",
      "level": 20,
      "missileId": 359,
      "cells": 3,
      "radius": 96,
      "life": 1.722,
      "every": 0.444,
      "pulses": 4,
      "enhance": 140,
      "chain": {
        "skillId": 340,
        "name": "Ngân Đao Xạ Nguyệt",
        "level": 20,
        "missileId": 150,
        "cells": 3,
        "radius": 96,
        "life": 0.889,
        "every": 0.444,
        "pulses": 2,
        "enhance": 183,
        "chain": null,
        "dmg": 39.73
      },
      "dmg": 30.39,
      "main": 128.96
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 66,
      "from": "1069:27",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1070",
    "name": "Thiết Liên Tứ Sát",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1070,
      "missileId": 332,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1070
      ],
      "skillName": "Thiết Liên Tứ Sát",
      "missileName": "散花天女",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "skill_cost_v",
        "missle_lifetime_v",
        "skill_attackradius",
        "skill_skillexp_v",
        "skill_eventskilllevel",
        "skill_flyevent",
        "seriesdamage_p",
        "poisondamage_v",
        "skill_showevent",
        "deadlystrike_p"
      ],
      "equipment": 102,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 15,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.throw",
    "range": 512,
    "radius": 32,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 2,
      "every": 0.667,
      "pulses": 3,
      "mine": false,
      "rangeDamage": false
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 2 giây, gây sát thương mỗi 0.667 giây (3 nhịp); một người nhận tối đa 330 sát thương gốc. Tầm nguồn: đặt xa 512px, bán kính 32px (1 ô CollidRange). Ngũ hành: trúng độc 66 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn); nhánh con khi trúng: trúng độc. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "sourceReach": {
      "attackRadius": 512,
      "cells": 1,
      "cellPx": 32,
      "from": "CollidRange"
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 66,
      "from": "1070:27",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "branchEffects": {
      "1098:27": {
        "event": "fly",
        "poison": {
          "dur": 3.333,
          "every": 0.556,
          "ticks": 6,
          "total": 66,
          "from": "1098:27",
          "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1071",
    "name": "Càn Khôn Nhất Trịch",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1071,
      "missileId": 333,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1071
      ],
      "skillName": "Càn Khôn Nhất Trịch",
      "missileName": "乾坤一掷",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "poisondamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_skillexp_v",
        "seriesdamage_p"
      ],
      "equipment": 100,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 5,
      "form": 2,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "amkhi",
    "survivalStatus": "playable",
    "dmg": 1650,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.throw",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 2,
      "generate": 5,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 5,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "5 đạn đúng nguồn, tổng 1650; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 512px (576px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: trúng độc 66 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn). Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận.",
    "reach": 512,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 16,
      "reach": 512,
      "collidCells": 1
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 66,
      "from": "1071:27",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1073",
    "name": "Thời Thặng Lục Long",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1073,
      "missileId": 335,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1073
      ],
      "skillName": "Thời Thặng Lục Long",
      "missileName": "时乘六龙",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_collideevent",
        "skill_showevent",
        "fatallystrike_p",
        "skill_skillexp_v",
        "seriesdamage_p",
        "skill_misslenum_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 2,
      "form": 1,
      "moveKind": 5,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 8
    },
    "pierce": true,
    "simplifications": [],
    "count": 2,
    "speed": 504,
    "width": 96,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "2 đạn đúng nguồn, tổng 330; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 448px (504px/giây), va chạm 96px (3 ô CollidRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 3 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "reach": 448,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 28,
      "lifeFrames": 16,
      "reach": 448,
      "collidCells": 3
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1074",
    "name": "Bổng Huýnh Lược Địa",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1074,
      "missileId": 336,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1074
      ],
      "skillName": "Bổng Huýnh Lược Địa",
      "missileName": "蜀犬吠日",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "firedamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_skillexp_v",
        "seriesdamage_p"
      ],
      "equipment": 2,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 6,
          "key": "gaibang",
          "name": "Cái Bang"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 3,
      "form": 0,
      "moveKind": 5,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "con",
    "survivalStatus": "playable",
    "dmg": 990,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.thrust",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 0,
      "generate": 5,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 3,
    "speed": 504,
    "width": 64,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "3 đạn đúng nguồn, tổng 990; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 784px (504px/giây), va chạm 64px (2 ô CollidRange). Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận.",
    "reach": 784,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 28,
      "lifeFrames": 28,
      "reach": 784,
      "collidCells": 2
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1076",
    "name": "Tật Hỏa Liệu Nguyên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1076,
      "missileId": 366,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1076
      ],
      "skillName": "Tật Hỏa Liệu Nguyên",
      "missileName": "疾火燎原子弹",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "seriesdamage_p",
        "fatallystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_skillexp_v",
        "skill_misslenum_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 7,
          "key": "tianren",
          "name": "Thiên Nhẫn Giáo"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 2,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 512,
    "radius": 160,
    "form": {
      "shape": 6,
      "generate": 2,
      "gap": 5
    },
    "zone": {
      "life": 2.056,
      "every": 1,
      "pulses": 3,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 2.056 giây, gây sát thương mỗi 1 giây (3 nhịp); một người nhận tối đa 330 sát thương gốc. Tầm nguồn: đặt xa 512px, bán kính 160px (5 ô DmgRange). Không giới hạn binh khí. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 512,
      "cells": 5,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1078",
    "name": "Tạo Hóa Thái Thanh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1078,
      "missileId": 340,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1078
      ],
      "skillName": "Tạo Hóa Thái Thanh",
      "missileName": "造化太清",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_v",
        "skill_attackradius",
        "skill_cost_v",
        "stun_p",
        "missle_lifetime_v",
        "skill_skillexp_v",
        "seriesdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 8,
          "key": "wudang",
          "name": "Võ Đang phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 15,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 512,
    "radius": 160,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 1.667,
      "every": 0.222,
      "pulses": 8,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 1.667 giây, gây sát thương mỗi 0.222 giây (8 nhịp); một người nhận tối đa 330 sát thương gốc. Tầm nguồn: đặt xa 512px, bán kính 160px (5 ô DmgRange). Không giới hạn binh khí. Hiệu ứng nguồn: 34% làm choáng 0,333 giây. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 512,
      "cells": 5,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "stun": {
      "chance": 0.34,
      "dur": 0.333,
      "from": "1078:27"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1080",
    "name": "Cửu Thiên Cương Phong",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1080,
      "missileId": 342,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1080
      ],
      "skillName": "Cửu Thiên Cương Phong",
      "missileName": "风鸣玉碎",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "lightingdamage_v",
        "skill_collideevent",
        "skill_showevent",
        "skill_skillexp_v",
        "seriesdamage_p",
        "stun_p"
      ],
      "equipment": 1,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "dao",
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 756,
    "width": 64,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "1 đạn đúng nguồn, tổng 330; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 512px, đạn bay 546px (756px/giây), va chạm 64px (2 ô CollidRange). Hiệu ứng nguồn: 30% làm choáng 0,667 giây. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "reach": 546,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 42,
      "lifeFrames": 13,
      "reach": 546,
      "collidCells": 2
    },
    "stun": {
      "chance": 0.3,
      "dur": 0.667,
      "from": "1080:27"
    },
    "sourceNotes": [
      {
        "scope": "branch:collide",
        "node": "1108:20",
        "name": "do_stun_p",
        "value": "10,0,0",
        "why": "do_stun_p: ý nghĩa cột chưa xác minh (có giá trị tới 3240 khung) — không chạy"
      }
    ]
  },
  {
    "id": "vltk-skill-1081",
    "name": "Thiên Lôi Chấn Nhạc",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1081,
      "missileId": 372,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1081
      ],
      "skillName": "Thiên Lôi Chấn Nhạc",
      "missileName": "雷电九啸符",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_v",
        "skill_eventskilllevel",
        "stun_p",
        "skill_showevent",
        "skill_cost_v",
        "seriesdamage_p",
        "skill_vanishedevent",
        "seriesdamage_p",
        "skill_skillexp_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 9,
          "key": "kunlun",
          "name": "Côn Lôn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 512,
    "radius": 64,
    "form": {
      "shape": 6,
      "generate": 3,
      "gap": 5
    },
    "zone": {
      "life": 0.167,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 512px, bán kính 64px (2 ô DmgRange). Không giới hạn binh khí. Hiệu ứng nguồn: 4% làm choáng 1,5 giây. Ngũ hành: nhánh con khi trúng: 15% choáng 1,5 giây. Nhặt bí kíp là dùng đủ cấp 27; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 512,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "stun": {
      "chance": 0.04,
      "dur": 1.5,
      "from": "1081:27"
    },
    "branchEffects": {
      "1109:27": {
        "event": "vanished",
        "stun": {
          "chance": 0.15,
          "dur": 1.5,
          "from": "1109:27"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1110",
    "name": "Tích Lịch Loạn Hoàn Kích",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1110,
      "missileId": 374,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1110
      ],
      "skillName": "Tích Lịch Loạn Hoàn Kích",
      "missileName": "陷阱150",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "deadlystrike_p",
        "skill_eventskilllevel",
        "skill_vanishedevent",
        "skill_showevent",
        "skill_cost_v",
        "poisondamage_v",
        "seriesdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 26,
      "factions": [
        {
          "id": 2,
          "key": "tangmen",
          "name": "Đường Môn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 26,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 7,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "playable",
    "dmg": 330,
    "mp": 35,
    "cd": 12,
    "hits": 1,
    "cast": 0.55,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 420,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 288,
    "width": 96,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 330,
    "desc": "1 đạn đúng nguồn, tổng 330; một người nhận tối đa 330 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 420px, đạn bay 960px (288px/giây), va chạm 96px (3 ô CollidRange). Không giới hạn binh khí. Ngũ hành: trúng độc 66 sát thương trong 3,333 giây (thời gian theo nguồn, tổng là luật Sinh tồn); nhánh con khi trúng: 21% choáng 1,167 giây, trúng độc, băng sát; 1% choáng 0,056 giây, trúng độc, băng sát. Nhặt bí kíp là dùng đủ cấp 26; không cần luyện cấp trong trận. Có 1 chiêu phụ được gọi ở cấp cao hơn cấp tối đa của nó (dùng cấp tối đa, chưa đối chiếu client).",
    "reach": 960,
    "sourceReach": {
      "attackRadius": 420,
      "speedPerFrame": 16,
      "lifeFrames": 60,
      "reach": 960,
      "collidCells": 3
    },
    "poison": {
      "dur": 3.333,
      "every": 0.556,
      "ticks": 6,
      "total": 66,
      "from": "1110:26",
      "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
    },
    "branchEffects": {
      "1113:21": {
        "event": "vanished",
        "stun": {
          "chance": 0.21,
          "dur": 1.167,
          "from": "1113:21"
        },
        "poison": {
          "dur": 2.778,
          "every": 0.556,
          "ticks": 5,
          "total": 66,
          "from": "1113:21",
          "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
        },
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 1,
          "from": "1113:21",
          "rule": "thời gian từ nguồn; mức chậm 25% là luật Sinh tồn"
        }
      },
      "352:1": {
        "event": "collide",
        "stun": {
          "chance": 0.01,
          "dur": 0.056,
          "from": "352:1"
        },
        "poison": {
          "dur": 2.778,
          "every": 0.556,
          "ticks": 5,
          "total": 66,
          "from": "352:1",
          "rule": "tổng = 20% ngân sách trên một người (luật Sinh tồn)"
        },
        "cold": {
          "k": 0.25,
          "dur": 0.056,
          "sourceTime": 0.056,
          "from": "352:1",
          "rule": "thời gian từ nguồn; mức chậm 25% là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1114",
    "name": "Ngọc Tuyền Tâm Kinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1114,
      "missileId": 375,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1114
      ],
      "skillName": "Ngọc Tuyền Tâm Kinh",
      "missileName": "辅助峨眉150",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "colddamage_v",
        "skill_eventskilllevel",
        "skill_flyevent",
        "skill_showevent",
        "skill_cost_v",
        "skill_skillexp_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 4,
          "key": "emei",
          "name": "Nga My phái"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 15,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "hybrid-support-pending",
        "text": "Chiêu lai: ngoài sát thương còn nhánh hồi phục/tăng lực cho bản thân (1115:lifereplenish_v); chưa nối cơ chế nguồn nên không rơi như chiêu công kích."
      }
    ],
    "reqLevel": 150,
    "sourceRole": "hybrid",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu lai: ngoài sát thương còn nhánh hồi phục/tăng lực cho bản thân (1115:lifereplenish_v); chưa nối cơ chế nguồn nên không rơi như chiêu công kích."
  },
  {
    "id": "vltk-skill-1350",
    "name": "Dưỡng Ngô Kiếm Pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 1350,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1350
      ],
      "skillName": "Dưỡng Ngô Kiếm Pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "deadlystrikeenhance_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1351",
    "name": "Kim Nhạn Hoành Không",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 1351,
      "missileId": 413,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1351
      ],
      "skillName": "Kim Nhạn Hoành Không",
      "missileName": "金雁横空",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage1",
        "addskilldamage2",
        "skill_attackradius",
        "skill_attackradius",
        "skill_eventskilllevel",
        "physicsenhance_p",
        "deadlystrike_p",
        "skill_desc"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 3,
      "form": 1,
      "moveKind": 5,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 512,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 5
    },
    "pierce": false,
    "simplifications": [
      "kích nổ dấu ấn"
    ],
    "count": 3,
    "speed": 576,
    "width": 96,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 185,
    "desc": "3 đạn đúng nguồn, tổng 185; một người nhận tối đa 185 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 512px, đạn bay 640px (576px/giây), va chạm 96px (3 ô CollidRange). Giản lược trong sinh tồn: kích nổ dấu ấn. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 640,
    "sourceReach": {
      "attackRadius": 512,
      "speedPerFrame": 32,
      "lifeFrames": 20,
      "reach": 640,
      "collidCells": 3
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1351:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1354",
    "name": "Hi Di Kiếm Pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 1354,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1354
      ],
      "skillName": "Hi Di Kiếm Pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1355",
    "name": "Thiên Thân Đảo Huyền",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 1355,
      "missileId": 414,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1355
      ],
      "skillName": "Thiên Thân Đảo Huyền",
      "missileName": "天绅倒悬",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage1",
        "addskilldamage2",
        "skill_eventskilllevel",
        "deadlystrike_p",
        "physicsenhance_p",
        "skill_desc"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 4,
      "form": 6,
      "moveKind": 0,
      "height": 18,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 50,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 220,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 360,
    "radius": 64,
    "form": {
      "shape": 6,
      "generate": 3,
      "gap": 5
    },
    "zone": {
      "life": 2.167,
      "every": 0,
      "pulses": 1,
      "mine": true,
      "rangeDamage": true
    },
    "simplifications": [
      "kích nổ dấu ấn"
    ],
    "desc": "Bẫy nguồn: nằm 2.167 giây, nổ khi kẻ địch chạm vào, gây 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: đặt xa 360px, bán kính 64px (2 ô DmgRange). Giản lược trong sinh tồn: kích nổ dấu ấn. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "sourceReach": {
      "attackRadius": 360,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1355:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1358",
    "name": "Huyễn Nhãn Vân Yên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 1358,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1358
      ],
      "skillName": "Huyễn Nhãn Vân Yên",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "walkrunshadow",
        "addcoldmagic_v",
        "coldenhance_p",
        "lifemax_yan_p",
        "fastwalkrun_p",
        "me2firedamage_p",
        "fire2medamage_p",
        "anti_block_rate",
        "fasthitrecover_yan_v",
        "fatallystrikeres_p"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 60,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-1360",
    "name": "Thương Tùng Nghênh Khách",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 1360,
      "missileId": 415,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1360
      ],
      "skillName": "Thương Tùng Nghênh Khách",
      "missileName": "苍松迎客1",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage1",
        "addskilldamage2",
        "skill_eventskilllevel",
        "deadlystrike_p",
        "physicsenhance_p",
        "skill_desc"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 6,
      "form": 0,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 1320,
    "mp": 22,
    "cd": 7,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 480,
    "radius": 65,
    "form": {
      "shape": 0,
      "generate": 4,
      "gap": 15
    },
    "pierce": true,
    "simplifications": [
      "kích nổ dấu ấn"
    ],
    "count": 6,
    "speed": 576,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 220,
    "desc": "6 đạn đúng nguồn, tổng 1320; một người nhận tối đa 220 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 480px, đạn bay 480px (576px/giây), va chạm 32px (1 ô CollidRange). Giản lược trong sinh tồn: kích nổ dấu ấn. Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh); nhánh con khi trúng: băng sát; băng sát. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 480,
    "sourceReach": {
      "attackRadius": 480,
      "speedPerFrame": 32,
      "lifeFrames": 15,
      "reach": 480,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1360:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "branchEffects": {
      "1361:20": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "1361:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      },
      "1362:20": {
        "event": "start",
        "cold": {
          "k": 0.25,
          "dur": 1,
          "sourceTime": 0,
          "from": "1362:20",
          "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1364",
    "name": "Đoạt Mệnh Liên Hoàn Tam Tiên Kiếm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 1364,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1364
      ],
      "skillName": "Đoạt Mệnh Liên Hoàn Tam Tiên Kiếm",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "autoreplyskill",
        "manareplenish_v",
        "manareplenish_p",
        "skill_skillexp_v",
        "skill_eventskilllevel",
        "skill_showevent"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "source-logic-unresolved",
        "text": "Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 90,
    "sourceRole": "support",
    "sourceIncomplete": true,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-1369",
    "name": "Cửu kiếm hợp nhất",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1369,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1369
      ],
      "skillName": "Cửu kiếm hợp nhất",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "autoattackskill",
        "manareplenish_v",
        "manareplenish_p",
        "skill_skillexp_v",
        "skill_desc",
        "skill_eventskilllevel",
        "skill_showevent"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "source-logic-unresolved",
        "text": "Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 150,
    "sourceRole": "support",
    "sourceIncomplete": true,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-1372",
    "name": "Thanh Vân Tống Sảng",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 1372,
      "missileId": 427,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1372
      ],
      "skillName": "Thanh Vân Tống Sảng",
      "missileName": "清风送爽",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "colddamage_v",
        "addskilldamage1",
        "skill_cost_v"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 400,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 5
    },
    "pierce": false,
    "simplifications": [],
    "count": 1,
    "speed": 360,
    "width": 32,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 160,
    "desc": "1 đạn đúng nguồn, tổng 160; một người nhận tối đa 160 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 400px, đạn bay 400px (360px/giây), va chạm 32px (1 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 400,
    "sourceReach": {
      "attackRadius": 400,
      "speedPerFrame": 20,
      "lifeFrames": 20,
      "reach": 400,
      "collidCells": 1
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1372:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1374",
    "name": "Long Nhiễu Thân",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 1374,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1374
      ],
      "skillName": "Long Nhiễu Thân",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "manareplenish_v",
        "manamax_yan_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1375",
    "name": "Hải Nạp Bách Xuyên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 1375,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1375
      ],
      "skillName": "Hải Nạp Bách Xuyên",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "damage2addmana_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1376",
    "name": "Long Huyền Kiếm Khí",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 1376,
      "missileId": 421,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1376
      ],
      "skillName": "Long Huyền Kiếm Khí",
      "missileName": "龙旋剑气",
      "match": "exact",
      "style": 0,
      "attrs": [
        "sorbdamage_yan_p",
        "anti_do_hurt_p",
        "skill_cost_v",
        "addskilldamage1",
        "lifemax_p",
        "lifemax_yan_p",
        "anti_sorbdamage_yan_p",
        "enhancehiteffect_rate",
        "enhancehit_rate"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 15,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-1378",
    "name": "Khí Chấn Sơn Hà",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 1378,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1378
      ],
      "skillName": "Khí Chấn Sơn Hà",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "rangedamagereturnmana_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1379",
    "name": "Khí Quán Trường Hồng",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 1379,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1379
      ],
      "skillName": "Khí Quán Trường Hồng",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "manatoskill_enhance"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1380",
    "name": "Ma Vân Kiếm Khí",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 1380,
      "missileId": 419,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1380
      ],
      "skillName": "Ma Vân Kiếm Khí",
      "missileName": "无极剑气",
      "match": "exact",
      "style": 0,
      "attrs": [
        "fastwalkrun_p",
        "skill_enhance",
        "skill_eventskilllevel",
        "skill_showevent",
        "skill_cost_v",
        "skill_desc",
        "addskilldamage1"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 15,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "hybrid-support-pending",
        "text": "Chiêu lai: ngoài sát thương còn nhánh hồi phục/tăng lực cho bản thân (1381:anti_do_hurt_p, 1381:lifemax_p, 1381:lifemax_yan_p, 1381:lifereplenish_v, 1381:manareplenish_v); chưa nối cơ chế nguồn nên không rơi như chiêu công kích."
      }
    ],
    "reqLevel": 60,
    "sourceRole": "hybrid",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "pending",
    "desc": "Chiêu lai: ngoài sát thương còn nhánh hồi phục/tăng lực cho bản thân (1381:anti_do_hurt_p, 1381:lifemax_p, 1381:lifemax_yan_p, 1381:lifereplenish_v, 1381:manareplenish_v); chưa nối cơ chế nguồn nên không rơi như chiêu công kích."
  },
  {
    "id": "vltk-skill-1382",
    "name": "Phách Thạch Phá Ngọc",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 1382,
      "missileId": 426,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1382
      ],
      "skillName": "Phách Thạch Phá Ngọc",
      "missileName": "劈石破玉",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "colddamage_v",
        "skill_skillexp_v",
        "skill_cost_v",
        "addskillexp1",
        "fatallystrike_p",
        "skill_misslenum_v"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 4,
      "form": 1,
      "moveKind": 5,
      "height": 10,
      "loop": true
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 90,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 520,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 2,
      "gap": 5
    },
    "pierce": false,
    "simplifications": [],
    "count": 3,
    "speed": 540,
    "width": 96,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "3 đạn đúng nguồn, tổng 250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Tầm nguồn: thi triển 520px, đạn bay 720px (540px/giây), va chạm 96px (3 ô CollidRange). Ngũ hành: băng sát làm chậm 25% trong 1 giây (luật Sinh tồn; nguồn ghi thời gian 0, chưa xác minh). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận.",
    "reach": 720,
    "sourceReach": {
      "attackRadius": 520,
      "speedPerFrame": 30,
      "lifeFrames": 24,
      "reach": 720,
      "collidCells": 3
    },
    "cold": {
      "k": 0.25,
      "dur": 1,
      "sourceTime": 0,
      "from": "1382:20",
      "rule": "nguồn ghi thời gian 0 (chưa xác minh); 25% trong 1 giây là luật Sinh tồn"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-1384",
    "name": "Thần Quang Toàn Nhiễu",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1384,
      "missileId": 425,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1384
      ],
      "skillName": "Thần Quang Toàn Nhiễu",
      "missileName": "神光旋绕",
      "match": "exact",
      "style": 0,
      "attrs": [
        "candetonate1",
        "candetonate2",
        "skill_cost_v",
        "skill_desc",
        "skill_skillexp_v"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 10,
          "key": "huashan",
          "name": "Hoa Sơn phái"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      }
    ],
    "reqLevel": 150,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
  },
  {
    "id": "vltk-skill-1963",
    "name": "Triều Thiên Khuyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 1963,
      "missileId": 523,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1963
      ],
      "skillName": "Triều Thiên Khuyết",
      "missileName": "朝天阙",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "physicsenhance_p",
        "deadlystrike_p",
        "firedamage_v",
        "addskilldamage1",
        "addskilldamage2",
        "skill_cost_v"
      ],
      "equipment": 8,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 40,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-1964",
    "name": "Vũ Hồn Thuẫn Pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 1964,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1964
      ],
      "skillName": "Vũ Hồn Thuẫn Pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "attackratingenhance_p",
        "deadlystrikeenhance_p",
        "addfiredamage_v"
      ],
      "equipment": 8,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1965",
    "name": "Thỉnh Anh Đề Nhuệ Lữ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 1965,
      "missileId": 525,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1965
      ],
      "skillName": "Thỉnh Anh Đề Nhuệ Lữ",
      "missileName": "请缨提锐旅",
      "match": "exact",
      "style": 0,
      "attrs": [
        "sorbdamage_yan_p",
        "anti_do_hurt_p",
        "cost_sp",
        "skill_desc",
        "anti_enhancehit_rate"
      ],
      "equipment": 8,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      },
      {
        "code": "resource-logic-pending",
        "text": "Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác. Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn."
  },
  {
    "id": "vltk-skill-1969",
    "name": "Huy Sư Diệt Lỗ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1969,
      "missileId": 528,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1969
      ],
      "skillName": "Huy Sư Diệt Lỗ",
      "missileName": "挥师灭虏",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "physicsenhance_p",
        "firedamage_v",
        "skill_attackradius",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_collideevent",
        "skill_showevent",
        "skill_skillexp_v",
        "seriesdamage_p",
        "deadlystrike_p"
      ],
      "equipment": 8,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 15,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-1971",
    "name": "Trí Dũng Siêu Luân",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 1971,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1971
      ],
      "skillName": "Trí Dũng Siêu Luân",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "autoreplyskill",
        "skill_eventskilllevel",
        "skill_showevent",
        "skill_cost_v",
        "skill_desc",
        "lifemax_p",
        "lifemax_yan_p"
      ],
      "equipment": 8,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "source-logic-unresolved",
        "text": "Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được."
      },
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 60,
    "sourceRole": "support",
    "sourceIncomplete": true,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chuỗi nguồn còn logic hoặc hướng khung ảnh chưa giải được. Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-1972",
    "name": "Đoạt cờ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 1972,
      "missileId": 531,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1972
      ],
      "skillName": "Đoạt cờ",
      "missileName": "夺寨扬旗",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "firedamage_v",
        "addskilldamage1",
        "addskilldamage2",
        "addskilldamage3",
        "skill_cost_v"
      ],
      "equipment": 8,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 5,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=8 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-1974",
    "name": "Trường Anh Huy Xích",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 1974,
      "missileId": 575,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1974
      ],
      "skillName": "Trường Anh Huy Xích",
      "missileName": "长缨挥斥",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "physicsenhance_p",
        "addskilldamage1",
        "addskilldamage2",
        "addskilldamage3",
        "missle_speed_v",
        "skill_cost_v",
        "skill_attackradius",
        "firedamage_v"
      ],
      "equipment": 7,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-1975",
    "name": "Vũ Hồn Đao Pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 1975,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1975
      ],
      "skillName": "Vũ Hồn Đao Pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 7,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1976",
    "name": "Công Trung Bỉnh Tính",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 1976,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1976
      ],
      "skillName": "Công Trung Bỉnh Tính",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "autocastskill",
        "special_point_base",
        "skill_desc",
        "anti_enhancehit_rate",
        "block_rate"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1977",
    "name": "Hám Sơn Kích",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 1977,
      "missileId": 576,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1977,
        1978
      ],
      "skillName": "Hám Sơn Kích",
      "missileName": "撼山击伤害",
      "match": "exact",
      "style": 1,
      "attrs": [
        "physicsenhance_p",
        "cost_sp",
        "deadlystrike_p",
        "missle_speed_v",
        "skill_attackradius",
        "skill_showevent",
        "skill_desc"
      ],
      "equipment": 7,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "hybrid-support-pending",
        "text": "Chiêu lai: ngoài sát thương còn nhánh hồi phục/tăng lực cho bản thân (1988:lifereplenish_dec_p); chưa nối cơ chế nguồn nên không rơi như chiêu công kích."
      },
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      },
      {
        "code": "resource-logic-pending",
        "text": "Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "hybrid",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu lai: ngoài sát thương còn nhánh hồi phục/tăng lực cho bản thân (1988:lifereplenish_dec_p); chưa nối cơ chế nguồn nên không rơi như chiêu công kích. Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác. Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn."
  },
  {
    "id": "vltk-skill-1979",
    "name": "Nộ Phách Thiên Nhai",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 1979,
      "missileId": 577,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1979
      ],
      "skillName": "Nộ Phách Thiên Nhai",
      "missileName": "怒劈天涯",
      "match": "exact",
      "style": 0,
      "attrs": [
        "firedamage_v",
        "physicsenhance_p",
        "addskilldamage1",
        "skill_attackradius",
        "skill_cost_v",
        "seriesdamage_p",
        "addskilldamage2"
      ],
      "equipment": 7,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 40,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-1980",
    "name": "Cô Tương Bách Chiến Hàm",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 1980,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1980
      ],
      "skillName": "Cô Tương Bách Chiến Hàm",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "attackspeed_v",
        "attackspeed_yan_v",
        "anti_block_rate",
        "me2metaldamage_p",
        "metal2medamage_p",
        "fastwalkrun_p",
        "allres_yan_p",
        "fasthitrecover_yan_v",
        "melee_returnres_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1981",
    "name": "Cơ Xan Lỗ Nhục",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 1981,
      "missileId": 578,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1981
      ],
      "skillName": "Cơ Xan Lỗ Nhục",
      "missileName": "饥餐胡虏肉",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "skill_cost_v",
        "firedamage_v",
        "missle_speed_v",
        "skill_attackradius",
        "seriesdamage_p",
        "addskilldamage2",
        "addskilldamage1"
      ],
      "equipment": 7,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 3,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 60,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-1982",
    "name": "Vũ Mục Di Thư",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 1982,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1982
      ],
      "skillName": "Vũ Mục Di Thư",
      "missileName": null,
      "match": "exact",
      "style": 2,
      "attrs": [
        "lock_life",
        "cost_sp",
        "skill_mintimepercast_v",
        "skill_mintimepercastonhorse_v",
        "skill_desc",
        "cast_when_buff_removed",
        "fasthitrecover_v",
        "anti_do_hurt_p",
        "stuntimereduce_p",
        "anti_do_stun_p",
        "skill_enhance",
        "ignorenegativestate_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "resource-logic-pending",
        "text": "Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn."
      },
      {
        "code": "attack-presentation-pending",
        "text": "Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
      }
    ],
    "reqLevel": 60,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": true,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn. Chưa có chuỗi đạn/hình nguồn đủ để dựng chiêu tấn công."
  },
  {
    "id": "vltk-skill-1983",
    "name": "Khát ẩm Hung Nô Huyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 1983,
      "missileId": 579,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1983
      ],
      "skillName": "Khát ẩm Hung Nô Huyết",
      "missileName": "渴饮匈奴血",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "skill_cost_v",
        "firedamage_v",
        "addskilldamage1",
        "missle_speed_v",
        "skill_attackradius",
        "skill_skillexp_v",
        "seriesdamage_p",
        "addskillexp1"
      ],
      "equipment": 7,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 3,
      "form": 2,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 80,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-1984",
    "name": "Trung Vu Lưu Phong",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 1984,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1984
      ],
      "skillName": "Trung Vu Lưu Phong",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "attackrating_p",
        "skill_desc",
        "skill_skillexp_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-1985",
    "name": "Trừ Gian Diệt Nịnh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 1985,
      "missileId": 580,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        1985
      ],
      "skillName": "Trừ Gian Diệt Nịnh",
      "missileName": "铲奸除佞",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "skill_cost_v",
        "firedamage_v",
        "reset_bufftime",
        "missle_speed_v",
        "skill_attackradius",
        "seriesdamage_p",
        "skill_desc",
        "skill_eventskilllevel",
        "skill_showevent",
        "skill_skillexp_v"
      ],
      "equipment": 7,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 11,
          "key": "wuhun",
          "name": "Vũ Hồn"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 3,
      "form": 2,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=7 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-2114",
    "name": "Ngô Câu Sương Tuyết",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 2114,
      "missileId": 637,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2114
      ],
      "skillName": "Ngô Câu Sương Tuyết",
      "missileName": "吴钩霜雪",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "physicsenhance_p",
        "lightingdamage_v",
        "addskilldamage1",
        "addskilldamage2",
        "addskilldamage3",
        "skill_cost_v"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 160,
    "mp": 12,
    "cd": 4,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "nova",
    "anim": "skill.slash",
    "range": 128,
    "radius": 128,
    "form": {
      "shape": 7,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.556,
      "every": 0,
      "pulses": 1,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Hiệu ứng đúng chuỗi kỹ năng VLTK; sát thương và hồi chiêu theo luật sinh tồn. Tầm nguồn: quanh thân, bán kính 128px (4 ô DmgRange). Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "sourceReach": {
      "attackRadius": 110,
      "cells": 4,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-2115",
    "name": "Tiêu Dao Kiếm Pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 2115,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2115
      ],
      "skillName": "Tiêu Dao Kiếm Pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addphysicsdamage_p",
        "deadlystrikeenhance_p"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-2116",
    "name": "Di Cung Hoán Vũ",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 2116,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2116
      ],
      "skillName": "Di Cung Hoán Vũ",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "autocastskill",
        "special_point_base",
        "freezetimereduce_p",
        "skill_desc",
        "do_stun_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-2118",
    "name": "Táp Đạp Lưu Tinh",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 2118,
      "missileId": 638,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2118,
        2119
      ],
      "skillName": "Táp Đạp Lưu Tinh",
      "missileName": "飒沓流星_起手式",
      "match": "exact",
      "style": 1,
      "attrs": [
        "skill_eventskilllevel",
        "skill_param1_v",
        "skill_desc",
        "cost_sp"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "support-logic-pending",
        "text": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công."
      },
      {
        "code": "movement-logic-pending",
        "text": "Chiêu điều khiển động tác/di chuyển; chưa nối đầy đủ cơ chế nguồn."
      },
      {
        "code": "resource-logic-pending",
        "text": "Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "support",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "pending",
    "desc": "Chiêu hỗ trợ hoặc trạng thái; chưa nối cơ chế nguồn vào sinh tồn, không gán sát thương tấn công. Chiêu điều khiển động tác/di chuyển; chưa nối đầy đủ cơ chế nguồn. Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn."
  },
  {
    "id": "vltk-skill-2120",
    "name": "ỷ Kiếm Phất Thiên",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 2120,
      "missileId": 649,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2120
      ],
      "skillName": "ỷ Kiếm Phất Thiên",
      "missileName": "倚剑拂天",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "lightingdamage_v",
        "addskilldamage1",
        "addskilldamage2",
        "skill_cost_v",
        "seriesdamage_p",
        "stun_p"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 6,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 40,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 1,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 185,
    "mp": 18,
    "cd": 6,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "ground",
    "anim": "skill.slash",
    "range": 400,
    "radius": 64,
    "form": {
      "shape": 6,
      "generate": 0,
      "gap": 0
    },
    "zone": {
      "life": 0.5,
      "every": 0.278,
      "pulses": 2,
      "mine": false,
      "rangeDamage": true
    },
    "simplifications": [],
    "desc": "Vùng nguồn tồn tại 0.5 giây, gây sát thương mỗi 0.278 giây (2 nhịp); một người nhận tối đa 185 sát thương gốc. Tầm nguồn: đặt xa 400px, bán kính 64px (2 ô DmgRange). Hiệu ứng nguồn: 15% làm choáng 0,667 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "sourceReach": {
      "attackRadius": 400,
      "cells": 2,
      "cellPx": 32,
      "from": "DmgRange"
    },
    "stun": {
      "chance": 0.15,
      "dur": 0.667,
      "from": "2120:20"
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-2121",
    "name": "Ngân Yên Bạch Mã",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 2121,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2121
      ],
      "skillName": "Ngân Yên Bạch Mã",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "fastwalkrun_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-2122",
    "name": "Hiệp Cốt Nhu Tình",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 2122,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2122
      ],
      "skillName": "Hiệp Cốt Nhu Tình",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "lifemax_yan_v",
        "unravel_effect"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-2123",
    "name": "Thiên Lý Độc Hành",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 3,
    "glyph": "武",
    "vltk": {
      "skillId": 2123,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2123
      ],
      "skillName": "Thiên Lý Độc Hành",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "attackspeed_v",
        "castspeed_v",
        "addlightingmagic_p",
        "addlightingdamage_v",
        "lifemax_yan_p",
        "deadlystrikeenhance_p",
        "me2waterdamage_p",
        "water2medamage_p",
        "anti_block_rate",
        "fasthitrecover_yan_v",
        "allres_yan_p",
        "anti_lightingres_yan_p"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 30,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 30,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-2124",
    "name": "Kiếm Quyết Phù Vân",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 2124,
      "missileId": 641,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2124
      ],
      "skillName": "Kiếm Quyết Phù Vân",
      "missileName": "剑决浮云_空",
      "match": "exact",
      "style": 0,
      "attrs": [
        "physicsenhance_p",
        "seriesdamage_p",
        "stun_p",
        "deadlystrike_p",
        "lightingdamage_v",
        "skill_cost_v",
        "skill_eventskilllevel",
        "skill_vanishedevent",
        "addskilldamage1",
        "skill_desc",
        "addskillexp1",
        "skill_skillexp_v",
        "skill_showevent"
      ],
      "equipment": 0,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": false
    },
    "enabled": true,
    "type": "active",
    "pendingReasons": [],
    "reqLevel": 90,
    "sourceRole": "attack",
    "sourceIncomplete": true,
    "sourceMissingInClient": 2,
    "weaponAny": false,
    "weapon": "kiem",
    "survivalStatus": "playable",
    "dmg": 250,
    "mp": 28,
    "cd": 10,
    "hits": 1,
    "cast": 0.25,
    "recover": 0.25,
    "kind": "projectile",
    "anim": "skill.slash",
    "range": 350,
    "radius": 65,
    "form": {
      "shape": 1,
      "generate": 0,
      "gap": 0
    },
    "pierce": true,
    "simplifications": [],
    "count": 1,
    "speed": 1440,
    "width": 16,
    "spread": 0.14,
    "radial": false,
    "capPerVictim": 250,
    "desc": "1 đạn đúng nguồn, tổng 250; một người nhận tối đa 250 sát thương gốc. Hồi chiêu theo luật sinh tồn. Đạn xuyên mục tiêu như nguồn. Tầm nguồn: thi triển 350px, đạn bay 320px (1440px/giây), va chạm 16px (0 ô CollidRange). Hiệu ứng nguồn: 20% làm choáng 0,667 giây. Ngũ hành: nhánh con khi trúng: 20% choáng 0,667 giây; 20% choáng 0,667 giây. Nhặt bí kíp là dùng đủ cấp 20; không cần luyện cấp trong trận. Bộ cài thiếu 1 tệp tham chiếu; phần ảnh/âm tương ứng để trống, không thay bằng tài nguyên chiêu khác.",
    "reach": 320,
    "sourceReach": {
      "attackRadius": 350,
      "speedPerFrame": 80,
      "lifeFrames": 4,
      "reach": 320,
      "collidCells": 0
    },
    "stun": {
      "chance": 0.2,
      "dur": 0.667,
      "from": "2124:20"
    },
    "branchEffects": {
      "2125:20": {
        "event": "fly",
        "stun": {
          "chance": 0.2,
          "dur": 0.667,
          "from": "2125:20"
        }
      },
      "2126:20": {
        "event": "vanished",
        "stun": {
          "chance": 0.2,
          "dur": 0.667,
          "from": "2126:20"
        }
      }
    },
    "sourceNotes": []
  },
  {
    "id": "vltk-skill-2127",
    "name": "Ăn Uống No Say",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 2127,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2127
      ],
      "skillName": "Ăn Uống No Say",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "autoattackskill",
        "skill_desc",
        "skill_skillexp_v"
      ],
      "equipment": -2,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-2136",
    "name": "Tùy ý Khúc",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 2136,
      "missileId": 645,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2136
      ],
      "skillName": "Tùy ý Khúc",
      "missileName": "广陵散",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_p",
        "seriesdamage_p",
        "addskilldamage1",
        "addskilldamage2",
        "addskilldamage3",
        "skill_cost_v"
      ],
      "equipment": 103,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=103 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 10,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=103 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-2137",
    "name": "Tiêu Dao Cầm Pháp",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 1,
    "glyph": "武",
    "vltk": {
      "skillId": 2137,
      "missileId": null,
      "column": null,
      "impact": null,
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2137
      ],
      "skillName": "Tiêu Dao Cầm Pháp",
      "missileName": null,
      "match": "exact",
      "style": 3,
      "attrs": [
        "addlightingmagic_p"
      ],
      "equipment": 103,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "none-in-table",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 0,
      "form": 7,
      "moveKind": 0,
      "height": 0,
      "loop": false
    },
    "enabled": false,
    "type": "noi",
    "fx": {},
    "move": {},
    "desc": "Kỹ năng bị động kích hoạt chiêu phụ; đang chờ dựng đúng cơ chế nguồn.",
    "survivalStatus": "passive-excluded"
  },
  {
    "id": "vltk-skill-2138",
    "name": "Lạc Nhạn Bình Sa",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 2138,
      "missileId": 644,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2138
      ],
      "skillName": "Lạc Nhạn Bình Sa",
      "missileName": "落雁平沙",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "lightingdamage_p",
        "stun_p",
        "cost_sp",
        "skill_eventskilllevel",
        "skill_desc"
      ],
      "equipment": 103,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 7,
      "moveKind": 0,
      "height": 10,
      "loop": false
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=103 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      },
      {
        "code": "resource-logic-pending",
        "text": "Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn."
      }
    ],
    "reqLevel": 30,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=103 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác. Chiêu yêu cầu tài nguyên/tầng trạng thái riêng; chưa nối cơ chế nguồn."
  },
  {
    "id": "vltk-skill-2140",
    "name": "Quảng Lăng Tán",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 2,
    "glyph": "武",
    "vltk": {
      "skillId": 2140,
      "missileId": 645,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2140
      ],
      "skillName": "Quảng Lăng Tán",
      "missileName": "广陵散",
      "match": "exact",
      "style": 0,
      "attrs": [
        "lightingdamage_p",
        "seriesdamage_p",
        "skill_misslenum_v",
        "skill_cost_v",
        "addskilldamage1",
        "addskilldamage2"
      ],
      "equipment": 103,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 2,
      "form": 0,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=103 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 40,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=103 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-2141",
    "name": "Cao Sơn Lưu Thủy",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 4,
    "glyph": "武",
    "vltk": {
      "skillId": 2141,
      "missileId": 646,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2141
      ],
      "skillName": "Cao Sơn Lưu Thủy",
      "missileName": "高山流水",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "lightingdamage_p",
        "stun_p",
        "addskilldamage1",
        "skill_cost_v",
        "addskillexp1",
        "skill_skillexp_v"
      ],
      "equipment": 103,
      "levelPolicy": "maximum",
      "maxLevel": 20,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 20,
    "nativeMotion": {
      "childCount": 1,
      "form": 1,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=103 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 90,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=103 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  },
  {
    "id": "vltk-skill-2142",
    "name": "Mai Hoa Tam Lộng",
    "han": "",
    "source": "Võ Lâm Truyền Kỳ",
    "tier": 5,
    "glyph": "武",
    "vltk": {
      "skillId": 2142,
      "missileId": 647,
      "column": "AnimFile2",
      "impact": "AnimFile4",
      "why": "Nguồn duy nhất: kỹ năng của icon và chuỗi kỹ năng con trong bảng VLTK.",
      "chain": [
        2142
      ],
      "skillName": "Mai Hoa Tam Lộng",
      "missileName": "梅花三弄",
      "match": "exact",
      "style": 0,
      "attrs": [
        "seriesdamage_p",
        "lightingdamage_p",
        "skill_collideevent",
        "skill_eventskilllevel",
        "skill_showevent",
        "skill_cost_v",
        "skill_skillexp_v"
      ],
      "equipment": 103,
      "levelPolicy": "maximum",
      "maxLevel": 27,
      "factions": [
        {
          "id": 12,
          "key": "xiaoyao",
          "name": "Phái Tiêu Dao"
        }
      ],
      "precastStatus": "available",
      "stageStatus": {}
    },
    "sourceLevelPolicy": "maximum",
    "sourceLevel": 27,
    "nativeMotion": {
      "childCount": 3,
      "form": 2,
      "moveKind": 1,
      "height": 10,
      "loop": true
    },
    "enabled": false,
    "type": "active",
    "pendingReasons": [
      {
        "code": "weapon-motion-pending",
        "text": "Binh khí nguồn EqtLimit=103 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
      }
    ],
    "reqLevel": 150,
    "sourceRole": "attack",
    "sourceIncomplete": false,
    "sourceMissingInClient": 0,
    "weaponAny": false,
    "weapon": null,
    "survivalStatus": "pending",
    "desc": "Binh khí nguồn EqtLimit=103 chưa có bộ chuyển động nhân vật tương ứng; không đổi sang binh khí khác."
  }
];
export const VLTK_BOOKS = VLTK_CATALOG.filter(b => b.enabled);
