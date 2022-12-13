const cleaner = (text) => {
   if (text == undefined) {
      return (
         ""
      )
   }
   if (typeof text != "string") {
      return (
         text
      )
   } else {
      const replacement =
         text.toString()
            .replace(/、/g, ",")
            .replace(/\\n/g, "\n")
            .replace(/\u001B/g, "\\b")
            .replace(//g, "\\b")
            .replace(/\\bPI/g, "<Fire>")
            .replace(/\\bPK/g, "<Thunder>")
            .replace(/\\bPM/g, "<Earth>")
            .replace(/\\bPN/g, "<Wind>")
            .replace(/\\bPP/g, "<Dark>")
            .replace(/\\bPL/g, "<Water>")
            .replace(/\\bPO/g, "<Holy>")
            .replace(/\\bPJ/g, "<Ice>")
            .replace(/\\bPF/g, "<HP>")
            .replace(/\\bPG/g, "<BRV>")
            .replace(/â‰¤/g, "≤")
            .replace(/â‰¥/g, "≥")
            .replace(/\\bPe/g, "I")
            .replace(/\\bPf/g, "II")
            .replace(/\\bPg/g, "III")
            .replace(/\\bPh/g, "IV")
            .replace(/\\bPi/g, "V")
            .replace(/\\bPj/g, "VI")
            .replace(/\\bPk/g, "VII")
            .replace(/\\bPl/g, "VIII")
            .replace(/\\bPm/g, "IX")
            .replace(/\\bPn/g, "X")
            .replace(/\\bPo/g, "XI")
            .replace(/\\bPp/g, "XII")
            .replace(/\\bPq/g, "XIII")
            .replace(/\\bPr/g, "XIV")
            .replace(/\\bPV/g, "FFT")
            .replace(/\\bPd/g, "0")
            .replace(/\\bQW/g, "FFCC")
            .replace(/\\bQ4/g, "XV")
            .replace(/\\bQj/g, "WOFF")
            .replace(/\\bUh/g, "O")
            .replace(/\\bP1/g, "【I】")
            .replace(/\\bP2/g, "【II】")
            .replace(/\\bP3/g, "【III】")
            .replace(/\\bP4/g, "【IV】")
            .replace(/\\bP5/g, "【V】")
            .replace(/\\bP6/g, "【VI】")
            .replace(/\\bP7/g, "【VII】")
            .replace(/\\bP8/g, "【VIII】")
            .replace(/\\bP9/g, "【IX】")
            .replace(/\\bPA/g, "【X】")
            .replace(/\\bPB/g, "【XI】")
            .replace(/\\bPC/g, "【XII】")
            .replace(/\\bPD/g, "【XIII】")
            .replace(/\\bPE/g, "【XIV】")
            .replace(/\\bQT/g, "【FFT】")
            .replace(/\\bP0/g, "【0】")
            .replace(/\\bQU/g, "【FFCC】")
            .replace(/\\bQ3/g, "【XV】")
            .replace(/\\bQi/g, "【WOFF】")
            .replace(/\\bUg/g, "【O】")
            .replace(/\\bQ5/g, "Dagger")
            .replace(/\\bQ6/g, "Sword")
            .replace(/\\bQ7/g, "Broadsword")
            .replace(/\\bQ8/g, "Staff")
            .replace(/\\bQ9/g, "Gun")
            .replace(/\\bQA/g, "Fist")
            .replace(/\\bQB/g, "Throwing")
            .replace(/\\bQq/g, "Spear")
            .replace(/\\bQr/g, "Bow")
            .replace(/\\bQs/g, "Whip")
            .replace(/\\bQt/g, "Mist Core (Kuja)")
            .replace(/\\bUY/g, "Red Crystal")
            .replace(/\\bUZ/g, "Blue Crystal")
            .replace(/\\bUa/g, "Green Crystal")
            .replace(/\\bUd/g, "Yellow Crystal")
            .replace(/\\bUc/g, "Black Crystal")
            .replace(/\\bUb/g, "White Crystal")
            .replace(/#lvd/g, "Lv9")
            .replace(/\\bQp/g, "+")
            .replace(/\\bR/g, "")
            .replace(/\\bC1/g, "")
            .replace(/\\bC4/g, "")
            .replace(/\\bY0/g, "")
            .replace(/\\bPa/g, "★")
            .replace(/％/gm, "%")
      return (
         replacement
      )
   }
}
export default cleaner