// Description:
//   Overwatch pick bot. only work in overwatch channel
// Commands:
//   pick (only work in overwatch channel)
//   픽 (only work in overwatch channel)
//   픽좀 (only work in overwatch channel)
//   픽 좀 (only work in overwatch channel)
//
var words = [
  /pick/i, /픽좀/i, /픽/i, /픽 좀/i
];

var hero = [
  {
    name: "겐지",
    scripts: [
      "겐지가 함께 한다.",
      "~류승룡기모찌!!~ 류진노 켄오 쿠라에~!! (竜神の剣を喰らえ！)",
      "미오 스테테모, 묘-리와 스테즈. (身を捨てても、名利は捨てず。)",
      "용이 내가 된다!!"
    ]
  },
  {
    name: "리퍼",
    scripts: [
      "죽음이.. 너의 곁을 걷는다....",
      "죽어, 죽어! 죽어!!!!",
      "여기는 리퍼.",
      "어둠으로부터.",
    ]
  },
  {
    name: "맥크리",
    icon : ":overwatch_mccree:",
    scripts: [
      "내 이름은 맥크리!!",
      "서두를 거 없잖아?",
      "석양이....진다.........",
      "앞으로 나오시지."
    ]
  },
  {
    name: "솔저:76",
    scripts: [
      "솔저:76, 작전을 시작한다.",
      "이 시간부로.. 우린 모두 군인이다",
      "목표를 ~못찾겠다~ 포착했다.",
      "전술 조준경 활성화!"
    ]
  },
  {
    name: "트레이서",
    scripts: [
      "트레이서 출동!",
      "안녕, 친구들? 해결사가 왔어!!",
      "새로운 영웅은 언제나 환영이야!! ~너만 빼고~",
      "데자뷰, 느껴본 적 있어?"
    ]
  },
  {
    name: "파라",
    scripts: [
      "파라, 작전 개시!!",
      "무고한 이들을 지키겠습니다.",
      "하늘에서 정의가 빗발친다!!!!",
      "포화 개시!!"
    ]
  },
  {
    name: "메이",
    icon: ":overwatch_mei:",
    scripts : [
      "똑똑, 메이가 왔어요~!",
      "우리 세계는 지킬 가치가 있어요.",
      "똥주!! 뿌 쒼 쒀!!! (冻住, 不许走!)",
      "~인천! 충치 알바!!~ (冰墙, 升起来吧!)"
    ]
  },
  {
    name: "바스티온",
    scripts: [
      "쀼쀼 쀼쀼쀼",
      "따따 쀼!",
      "뿌잉 뿌잉 뿌잉!",
      "우웅 삐삐삑삑쀡쀠익!"
    ]
  },
  {
    name : "위도우메이커",
    scripts: [
      "여긴 위도우메이커!",
      "아무도 내게서 숨진 못해",
      "어렸을 때.. 난 거미가 무서웠어....",
      "Personne n'échappe à mon regard."
    ]
  },
  {
    name: "정크랫",
    scripts: [
      "정크렛, 준비 끝!",
      "깽판 치기 딱 좋은 날씨네!",
      "신사 숙녀 여러분! 한 번 달려보자고!",
      "폭탄 받아라!!"
    ]
  },
  {
    name: "토르비욘",
    scripts: [
      "토오~르비욘! 작업준비 끝!",
      "너는 대단한 일을 해낼 거란다.",
      "내 새끼ㅠㅠㅠㅠㅠㅠ 진짜 공들였는데.",
      "초오고오여얼~ 요옹과앙로오오오오오오!!!"
    ]
  },
  {
    name: "한조",
    scripts: [
      "한조, 대기 중.",
      "죽음에는 명예가 따르고, 명예에는 구원이 따른다",
      "류요, 와가 테키오 쿠라에!!! (竜よ、我が敵を食らえ!)",
      "용의 눈으로 봐라."
    ]
  },
  {
    name: "D.Va",
    scripts: [
      "게임을 하면 이겨야지!",
      "이것도 너프해 보시지!!!!",
      "디바 온라인!",
      "자폭 시퀀스 가동!"
    ]
  },
  {
    name: "라인하르트",
    scripts: [
      "라인하르트! 대령했소이다.",
      "두려워 말게, 내가 그대들의 방패라네!!",
      "망치 나가신다!!!!",
      "으윽! 내일 일어나면 좀 뻐근하겠군."
    ]
  },
  {
    name: "로드호그",
    scripts:[
      "나는 재앙을 불러온다.",
      "로드호그의 시간이다.",
      "돼~재앙이 준비됐다!",
      "급할 거 없지."
    ]
  },
  {
    name : "윈스턴",
    scripts: [
      "오 안녕하세요",
      "윈스턴 보고합니다!",
      "상상력이야말로 발견의 어머니입니다.",
      "이거, 갑자기 뛰어들어서 죄송합니다.",
      "어... 그게... 제가 좀... 흥분했군요. 헤헤."
    ]
  },
  {
    name: "자리야",
    scripts :[
      "함께일 때, 우린 강합니다.",
      "자리야, 임무 대기 중.",
      "아곤! 빠가똥!! (Огонь по готовности!)",
      "방벽 씌웠습니다. 가세요!"
    ]
  },
  {
    name: "루시우",
    scripts: [
      "힘내, 우린 할 수 있어!",
      "하하! 음악의 치유사!",
      "볼륨 최대로!",
      "오우! 제대로 놀아보자~!!!!!"
    ]
  },
  {
    name : "메르시",
    scripts: [
      "내 시종은 죽지 않아요",
      "제가 여러분을 돌보겠어요",
      "오늘 당직은 메르시입니다.",
      "치유의 물결, 가동.",
      "영웅은 죽지 않아요 ~대가를 치를 뿐...~"
    ]
  },
  {
    name: "시메트라",
    scripts: [
      "인류의 진정한 적은 무질서에요",
      "시메트라, 보고합니다.",
      "방어 매트릭스 구축 완료.",
      "순간 이동기 가동. 길을 열었어요"
    ]
  },
  {
    name : "아나",
    scripts: [
      "신념을 위한 싸움을 멈추지 마라.",
      "넌 강해졌다. 돌격해!",
      "여기는 아나",
      "!وريهم قوتك (wareehom quwitak.)"
    ]
  },
  {
    name: "젠야타",
    icon: ":overwatch_zenyatta:",
    scripts: [
      "진정한 자아엔 형체가 없는 법",
      "오로지 승리만 생각하시오. 패배는 불가능하다고 여기시오.",
      "그대 마음속에 번뇌가 도사리고 있소.",
      "~우유를 쳐마시오~ 고요를 체험하시오."
    ]
  },
  {
    name: "솜브라",
    scripts:[
      "무엇이든... 누구든 해킹할 수 있어.",
      "항상 백도어는 남겨둬야지.",
      "¡Apagando las luces!",
      "나 찾는 거야?",
      "솜브라 온라인",
      "뿝!",
      "그냥 버그 잡고 있어."
    ]
  }
];

module.exports = function(robot){
  words.forEach(function(word){
    robot.hear(word, pick);
  });
  function pick(res){
    var room = robot.adapter.client.rtm.dataStore.getChannelById(res.message.room)

    if (!room || room.name == "overwatch") {
      var index = rindex(hero);
      var scriptNum = rindex(hero[index].scripts)

      console.log(index, "/",scriptNum,"/", hero[index]);

      var text = "";
      text += hero[index].icon ? hero[index].icon : "";
      text += "["+hero[index].name+"] ";
      text += hero[index].scripts[scriptNum];

      res.reply(text);
    }
  }
}

function rindex(arr){
  return Math.floor(Math.random() * arr.length)
}
