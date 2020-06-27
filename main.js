window.onload = function () {

    let cards = Array();
    datos.cards.forEach((card, indx) => {
        if (card.idList == "5e9481656f0c1e868c47627d") {

            let lista_checks = Array();
            datos.checklists.forEach(checklist => {
                if (checklist.idCard == card.id) {
                    lista_checks.push({
                        name: checklist.name,
                        items: checklist.checkItems
                    });
                }
            })

            cards.push({
                id: card.id,
                name: card.name,
                desc: card.desc,
                shortUrl: card.shortUrl,
                checklists: lista_checks
            });
        }
    })

    console.log("New cards:", cards);

    document.getElementById("csv-cards").innerHTML += '#, Name, Description, Short Url <br/>';

    for (var i = 0; i < cards.length; i++) {
        let card = cards[i];
        let newDesc = card.desc.replace(/,/g, " ");
        let line = `${i + 1}, ${card.name}, ${newDesc}, ${card.shortUrl} <br/>`;
        document.getElementById("csv-cards").innerHTML += line;

        if (card.checklists.length) {
            card.checklists.forEach(cl => {
                document.getElementById("csv-cards").innerHTML += `, , , <br/>`;
                document.getElementById("csv-cards").innerHTML += ` , ${cl.name}: <br/>`;

                cl.items.forEach(task => {
                    let formattedName = task.name.replace(/,/g, " ");
                    document.getElementById("csv-cards").innerHTML += `, ${formattedName}, ${task.state}, <br/>`;
                })

                document.getElementById("csv-cards").innerHTML += `, , , <br/>`;


            })
        }

    }



}