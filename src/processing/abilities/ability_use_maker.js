export default function ability_use_maker (character_ability) {

    var number = character_ability && character_ability.UseNum || 0

    if (character_ability.Trap == true ||
        character_ability.FollowUp == true ||
        character_ability.Counter == true ||
        character_ability.BRV == true ||
        character_ability.HP == true
    ) {
        number = 0
    } else {
        if (character_ability.increase != undefined) {
            var new_value = character_ability.UseNum
            var new_recast = 0
            character_ability.increase.forEach(self => {
                if (self.use != undefined) {
                    new_value = new_value + self.use
                }
                if (self.recast != undefined) {
                    new_recast = new_recast + self.recast
                }
            })
            if (new_recast != 0) {
                new_value = ((100 - new_recast) / 100) * new_value
            }
            number = new_value
        } else {
            if (character_ability && character_ability.BT == true && character_ability.UseNum == 0 && character_ability && character_ability.disp_flag_ == 1) {
                number = 1
            } else {
                number = character_ability.UseNum
            }
        }
    }

    if (number <= 99) {
        return (
            number
        )
    }
    if (number >= 100 && number < 3000) {
        return (
            "Fast+++"
        )
    }
    if (number >= 3000 && number < 6000) {
        return (
            "Fast++"
        )
    }
    if (number >= 6000 && number <= 9000) {
        return (
            "Fast+"
        )
    }
    if (number >= 9000 && number < 12000) {
        return (
            "Fast"
        )
    }
    if (number >= 12000 && number < 15000) {
        return (
            "Normal"
        )
    }
    if (number >= 15000 && number < 18000) {
        return (
            "Slow"
        )
    }
    if (number >= 18000 && number < 21000) {
        return (
            "Slow-"
        )
    }
    if (number >= 21000) {
        return (
            "Slow--"
        )
    }
    return number
}