const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Home", sName:"Edwin Leung"});
    }
    render(sPage) {
        const oJson = fetch("https://ux308winter2021-96b76-default-rtdb.firebaseio.com/meals.json").json();
        console.log(oJson);
        let sResult = "<h1>Upcoming Popup Meals</h1>";
        Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            console.log(oEntity);
            oEntity.id = key;
            sResult += `
            <h2>${oEntity.title}</h2>
            <p><img src="${oEntity.featured_image}" alt="${oEntity.title}"</p>
            <p>${oEntity.full_description}</p>
            <p>${oEntity.price}</p>
            <p>${oEntity.date}</p>
            <p>${oEntity.location}</p>
            <form action="https://desolate-cliffs-46309.herokuapp.com/payment" method="post">
            <input type ="hidden" name ="price" value ="${oEntity.price}" />
            <input type="hidden" name="title" value="${oEntity.title}" />
            <input type="tel" placeholder="Enter your number" name="telephone"/>
            <button type="submit">Order now</button>
            </form>
            `;
        });    
        return sResult;
    }
}