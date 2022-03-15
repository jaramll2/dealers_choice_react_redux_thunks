const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));



app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/api/places', async(req,res,next)=>{
    try{
        const places = await Place.findAll();
        res.send(places);
    }
    catch(err){
        next(err);
    }
});

app.post('/api/places',async(req,res,next)=>{
    try{
        const newPlace = await Place.create({name: req.body.name, description: req.body.description});
        res.status(201).send(newPlace);
    }
    catch(err){
        next(err);
    }
});

app.delete('/api/place/:id',async(req,res,next)=>{
    try{
        const place = await Place.findByPk(req.params.id);
        await place.destroy();
        res.sendStatus(204);
    }
    catch(err){
        next(err);
    }
});

//database to be refactored out
const Sequelize = require('sequelize');
const { validate } = require('webpack');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bill_db');


const Place = sequelize.define('places',{
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})

const syncAndSeed = async()=>{
    try{
        await Promise.all([
            Place.create({name: 'Holy Name Cathedral', description: 'The 1926 hit that took down Al Capone rival Hymie Weiss outside Holy Name Cathedral left the church with bullet holes alleged to possess supernatural qualities. Believers say the holes have always resisted patching, claiming the mortar used would pop out or fail to harden. Bielski says she was skeptical about the site’s paranormal associations until a few years back, when a tour participant captured photos of unexplained orbs of light surrounding the cornerstone (unfortunately now partially blocked by stairs).'}),
            Place.create({name: 'Victory Gardens Biograph Theater', description: 'Legend says John Dillinger’s ghost haunts the alley where he died in a hail of FBI bullets after a movie at the Biograph (now Victory Gardens Biograph Theater) in 1934. Taylor’s not convinced. "There is solid evidence to suggest that Dillinger didn’t die that night," he says. "Even his own family didn’t recognize the corpse." Taylor says the ghost may be Jimmy Lawrence, who was set up to be killed in Dillinger’s place.'}),
            Place.create({name: 'St. Valentine’s Day Massacre Site', description: 'If you don’t pick up on any supernatural energy at this grassy Clark Street lot (formerly a garage and bootlegging operation where seven of Bugs Moran’s men were famously shot in 1929), your four-legged friend might. According to Taylor, Highball, a dog belonging to Moran’s mechanic, was there during the massacre. "It wasn’t the machine guns that alerted neighbors to a problem at the garage but rather Highball’s howling," he says. Since then, it’s rumored that some dogs become distressed when passing the site. Why the canine jitters? Says Taylor, "I’ve always theorized that dogs were sensing the trauma experienced by Highball that morning."'}),
            Place.create({name: 'Lincoln Park', description: 'Lincoln Park is one of Chicago’s most idyllic spaces—or is it? (Dun, dun, dun!) In fact, Bielski declares it "without a doubt the most active site I’ve investigated," citing “activity both visual and auditory, manifesting in \'heavy\' atmospheres and physical effects like light-headedness and nausea." In her view, the high level of paranormality is linked to the land’s former function as the city’s main cemetery. Though many of the bodies interred here had been relocated by the time the Great Fire struck in 1871, the blaze destroyed the remaining wooden grave markers. Today the park’s verdant lawns and playing fields may conceal as many as 10,000 unmarked graves.'}),
            Place.create({name: 'The Red Lion Pub', description: 'When a brand-new iteration of this Lincoln Park institution launched in 2014, some say it didn’t take long for the original pub’s spirits to show up. Among them is Sharon, the ghost of a woman alleged to have died of measles in 1959, when the site was residential. According to some of the Red Lion\'s staff, Sharon is mischievous; she might topple books from shelves, interfere with the sound system or even open latched windows.'}),
            Place.create({name: 'Historic Water Tower', description: 'Legend has it that as the Great Chicago Fire ravaged Michigan Avenue, one noble soul stayed behind to man the water. When the flames encroached upon the tower, the lone pumpman climbed to the top and hanged himself rather than burn to death. Today it’s said an apparition can sometimes be seen hanging from the tower’s rafters. Bielski says the structure’s paranormality might relate to the material it’s made of. "Limestone has always been known to have some quality about it that holds onto energy, so we actually see things replay themselves like video tapes," she says.'}),
            Place.create({name: 'Battle of Fort Dearborn Park', description: 'The 1812 evacuation of the American military fort and small settlement that once stood at Michigan Avenue and Wacker Drive turned deadly when the retreating column was ambushed by Potawatomi warriors near what’s now the Prairie Avenue District. Sixty-eight were killed, women and children among them. It’s said that in the 1980s, excavation work at the site (now a commemorative park) uncovered human remains dating to this violent episode; since then, there have been reports of apparitions in 19th-century dress who wander the area.'}),
            Place.create({name: 'Liar’s Club', description: 'The site of at least two grisly murders—one with an axe, the other with a soda bottle—the building that houses this tavern-turned-punk-rock-club has a bloody history. Often included as a stop on local ghost tours, Liar\'s Club hosted Discovery Channel\'s Ghost Lab team in 2009, which used a "biocam" to detect "negative emotions" lingering in the space. The anger and fear they detected could be evidence of ghosts, but those feelings could just as easily be transmitted by some of the bands that have performed on the club\'s stage.'}),
            Place.create({name: 'Eastland Disaster Site', description: 'Shortly after boarding for a company outing to Michigan City on July 24, 1915, the SS Eastland capsized in the Chicago River between LaSalle and Clark Streets, claiming 844 lives. "The trauma suffered by those who died at the site left an impression behind, stored up energy," says Taylor. Since then, it seems some passersby—many with no awareness of the tragedy—have perceived this energy, reporting feeling panicked or compelled to jump into the water. The 2nd Regiment Armory, known more recently as Harpo Studios, served as a makeshift morgue after the disaster. Bielski once applied a contact microphone to the building’s walls. "We managed to record actual voices that seemed to be talking about the Eastland Disaster. There was a woman’s voice that said, \'Died on the water ship,\' and an English-accented man’s voice that said, \'It’s going down.\'"'}),
            Place.create({name: 'H.H. Holmes’s “Murder Castle” site', description: 'The Englewood torture palace of the notorious serial killer H.H. Holmes, who preyed upon women drawn to Chicago by the 1893 Columbian Exposition, was demolished in 1938. Bielski contends that the site, now an empty lot, remains charged with evil energy. Next door is a post office that may share part of the castle’s foundation. "In the basement of the post office, they’ve had a lot of poltergeist experiences: things that move around, items of furniture found stacked on top of each other, female voices singing and talking. So there seems to be a lot of residual haunting."'}),
            Place.create({name: 'Graceland Cemetery', description: 'Dating back to 1860, this cemetery has been the final resting place for numerous famous Chicagoans—urban designer Daniel H. Burnham, film critic Roger Ebert and business magnate Marshall Field, to name a few. But it\'s a grave bearing the name "Inez Clarke" that might actually be haunted. According to accounts from security guards and visitors, the statue of a young girl clutching a parasol enclosed in glass atop the tomb has a tendency to intermittently disappear. Evidence of a haunting or perhaps a portal to a supernatural realm? You can visit and decide for yourself.'}),
            Place.create({name: 'Iroquois Theatre', description: 'More than 600 lives were lost in a fire at the Iroquois Theatre on December 30, 1903. The building was razed in 1926 (today the Oriental stands in its place), but Taylor says the rear alleyway (where more than 100 people, many children, died after throwing themselves from upper floors) remains abuzz with supernatural activity: "Theatergoers and cast members talk about encountering ghostly children—laughter, footsteps, cries—and a woman told me she was once passing through and felt a small hand take hold of hers."'}),
            Place.create({name: 'Resurrection Cemetery', description: 'Taylor calls it "not just a vanishing hitchhiker story, but the vanishing hitchhiker story." After a night of dancing at the O’Henry Ballroom (now the Willowbrook) circa the 1930s, a woman was fatally struck by a car on Archer Avenue. She was laid to rest at nearby Resurrection Cemetery—but she’s not so restful. Since then, tales have circulated of a woman in ’30s garb who hitches a ride along Archer, only to disappear as the car approaches the cemetery. Once, a passerby allegedly spotted the specter clutching the cemetery gates as if locked inside; later inspection revealed what seemed to be handprints burned into the iron bars. (The bars were eventually removed.)'}),
            Place.create({name: 'Bachelor’s Grove Cemetery', description: 'After writing a book (Haunted Bachelor’s Grove, due out in October) on this dilapidated southwest suburban cemetery, Bielski calls it "the one place where there’s no doubt in my mind that the paranormal is real." A vanishing house, a phantom horse and plowman, and a wandering woman are among the specters commonly reported here. Bielski ascribes the site’s high level of activity to "an ancient force, something malevolent," as well as a spate of occult activity in the ’60s and ’70s that may have involved unsettling practices like animal sacrifice and grave desecration.'}),
            Place.create({name: 'Congress Plaza Hotel', description: 'Tales of strange happenings abound at this atmospheric (read: eerie) 1893 hotel. Particularly notorious is the 12th floor, alleged to be inhabited by the ghosts of two young children whose mother, a Czech immigrant driven from her homeland by Nazi persecution, pulled them along when she leapt from a window. Bielski recalls some less-than-restful nights spent here: "I’ve had the covers pulled off of me. I’ve had incessant knocking on my door all night long. My daughter and I heard two gentlemen whispering at the end of our bed." Sleep tight, kiddos.'}),
            Place.create({name: 'House of Blues', description: 'The building that currently hosts the House of Blues was originally part of the Marina City complex and was home to the Marina Cinemas until it closed in 1977. The movie theater was the site of a blood-curdling crime in 1972 when its manager, Gloria Kirkpatrick, was stabbed multiple times by an unseen assailant. Kirkpatrick passed away en route to the hospital and the primary suspect for her murder, Theodore J. Jagiello, died before detective could build a case against him. Kirkpatrick was a resident of west tower, so it\'s possible that her spirit now resides somewhere in the Marina City complex where she spent her final days—perhaps inside her apartment on the 39th floor?'}),
        ]);
    }
    catch(err){
        console.log(err);
    }
}

const start = async ()=>{
    try{
        await sequelize.sync({force: true});

        await syncAndSeed();

        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on ${port}`));
    }
    catch(err){
        console.log(err);
    }
};

start();