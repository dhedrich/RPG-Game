$(document).ready(function () {
    // array of char objs
    var characters
    // chosen hero obj
    var chosenHero
    // hero chosen bool
    var isHeroChosen
    // hero alive bool
    var isHeroAlive
    // chosen enemy obj
    var chosenEnemy
    // enemy chosen bool
    var isEnemyChosen
    // enemy alive bool
    var isEnemyAlive
    // enemies remaining num
    var enemiesRemaining
    // wins num
    var wins = 0
    // losses num
    var losses = 0

    // attack function
    function attack() {
        // on attack:
        // current hero hp = current hero hp - current enemy attack
        // current enemy hp = current enemy hp - current hero attack
        // current hero attack = current hero attack + original hero attack
        if (isEnemyChosen && isHeroChosen) {
            if (chosenHero.hp > 0 || chosenEnemy.hp > 0) {
                chosenHero.hp -= chosenEnemy.counterattack
                chosenEnemy.hp -= chosenHero.attack
                chosenHero.attack += chosenHero.increment
            }
            if (chosenHero.hp <= 0) {
                losses++
                initGame()
                isHeroChosen = false
                isHeroAlive = false
            }
            if (chosenEnemy.hp <= 0) {
                $('.chosen-enemy').empty()
                isEnemyChosen = false
                isEnemyAlive = false
            }
        }
        enemiesRemaining = $('.inactive').length
        if (enemiesRemaining === 0) {
            wins++
            initGame()
        }
        $('.chosen-hero > p').text('HP: ' + chosenHero.hp)
        $('.chosen-enemy > p').text('HP: ' + chosenEnemy.hp)
        console.log('enemies remaining:' + enemiesRemaining)
    }

    // init game fn
    function initGame() {
        characters = [
            {
                name: 'Mario',
                image: 'assets/images/mario.png',
                hp: 200,
                attack: 10,
                counterattack: 10,
                increment: 10
            },
            {
                name: 'Link',
                image: 'assets/images/link.png',
                hp: 300,
                attack: 4,
                counterattack: 8,
                increment: 4
            },
            {
                name: 'Fox',
                image: 'assets/images/fox.png',
                hp: 180,
                attack: 12,
                counterattack: 16,
                increment: 12
            },
            {
                name: 'Kirby',
                image: 'assets/images/kirby.png',
                hp: 190,
                attack: 9,
                counterattack: 11,
                increment: 9
            },
            {
                name: 'Pikachu',
                image: 'assets/images/pikachu.png',
                hp: 170,
                attack: 13,
                counterattack: 17,
                increment: 13
            },
            {
                name: 'Ness',
                image: 'assets/images/ness.png',
                hp: 240,
                attack: 5,
                counterattack: 7,
                increment: 5
            }
        ]
        isHeroChosen = false
        isEnemyChosen = false
        $('.characters').empty()
        $('.col-sm-5').empty()
        var num = Math.floor(12 / characters.length)
        for (var i = 0; i < characters.length; i++) {
            var charThing = $("<div class='char inactive col-md-" + num + "'character-" + i + "' value='" + i + "'></div>")
            charThing.html(
                "<h3>" + characters[i].name + "</h3>" +
                "<img class='char-img' src='" + characters[i].image + "'/>" +
                "<p>HP: " + characters[i].hp + "</p>"
            )
            $('.characters').append(charThing)
        }
        enemiesRemaining = $('.inactive').length
        console.log('enemies remaining:' + enemiesRemaining)
        $('#enemies-remaining').text('Choose Your Character')
        $('#wins').text('Wins: ' + wins)
        $('#losses').text('Losses: ' + losses)
    }

    $(document).on('click', '.char', function () {
        if (!isHeroChosen) {
            chosenHero = characters[$(this).attr('value')]
            isHeroChosen = true
            $(this).addClass('fader-green')
            var p = $(this).html()
            $(this).removeClass('inactive')
            var q = $('.chosen-hero').append(p)
            q.removeClass('col-md-2')
            q.removeClass('inactive')
            $('#enemies-remaining').text('Choose First Challenger')
        } else if (!isEnemyChosen && $(this).hasClass('inactive')) {
            chosenEnemy = characters[$(this).attr('value')]
            isEnemyChosen = true
            $(this).addClass('fader-red')
            var p = $(this).html()
            $(this).removeClass('inactive')
            var q = $('.chosen-enemy').append(p)
            q.removeClass('col-md-2')
            q.removeClass('inactive')
            $('#enemies-remaining').text('Enemies Remaining: ' + $('.inactive').length)
        }
    })

    // button click listeners
    $(document).on('click', '#attack', attack)
    $(document).on('click', '#new-game', initGame)

    // start game
    initGame()
})

