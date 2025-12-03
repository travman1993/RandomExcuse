// ============================================================================
// CAUGHT-SLIPPIN.COM - Main JavaScript
// ============================================================================

// ============================================================================
// 1. CONSTANTS & DOM SELECTORS
// ============================================================================

const SELECTORS = {
    categorySelect: '#category-select',
    toneButtons: '.tone-btn',
    generateBtn: '#generate-btn',
    resultContainer: '#result-container',
    resultText: '#result-text',
    resultTone: '#result-tone',
    copyBtn: '#copy-btn',
    smsBtn: '#sms-btn',
    shareBtn: '#share-btn',
    saveBtn: '#save-btn',
    rateUpBtn: '#rate-up-btn',
    rateDownBtn: '#rate-down-btn',
    toast: '#toast',
    showMoreBtn: '#show-more-tips',
    hiddenTips: '.hidden-tip',
    copyTipBtns: '.copy-tip-btn',
    saveTipBtns: '.save-tip-btn',
    rateTipBtns: '.rate-tip-btn'
};

const STORAGE_KEYS = {
    savedReplies: 'caught-slippin-saved-replies',
    savedTips: 'caught-slippin-saved-tips',
    lastCategory: 'caught-slippin-last-category',
    lastTone: 'caught-slippin-last-tone'
};

// ============================================================================
// 2. DATA - CATEGORIES & EXCUSES
// ============================================================================

const CATEGORIES = {
    'late-for-work': {
        title: 'Late for work',
        description: 'Running behind schedule for work',
        serious: [
            "I'm so sorry I'm running late — there was an unexpected issue with public transit this morning.",
            "Apologies for the delay. My alarm didn't go off and I just woke up. Heading in now.",
            "I'm running about 20 minutes behind. Had a car issue this morning but I'm on my way.",
            "Sorry for being late. There was a family situation I had to handle this morning.",
            "I apologize for the tardiness. Traffic was completely backed up due to an accident on the highway.",
            "Running late today — had to deal with an urgent home maintenance issue. Will be there ASAP.",
            "Sorry, my usual route was closed and I got turned around. Should be there in 15 minutes.",
            "Apologies. I had a medical appointment run over this morning. On my way now.",
            "I'm running behind schedule. Had to help my neighbor with an emergency. Nearly there.",
            "Sorry for the delay. Woke up feeling unwell but I'm coming in now.",
            "Running about 15 minutes late due to a delayed train. Apologies for the inconvenience.",
            "I'm sorry — had a flat tire this morning. Getting it sorted and will be there soon.",
            "Apologies for being late. There was a power outage and my phone didn't charge overnight.",
            "Running behind this morning. Had an important personal call I had to take. Almost there.",
            "Sorry I'm late. My child was sick and I had to make arrangements. On my way.",
            "I apologize for the delay. There was a water leak in my apartment I had to address.",
            "Running late due to unexpected road closures. Taking an alternate route now.",
            "Sorry for being tardy. Had a last-minute emergency with my pet. Heading in now.",
            "Apologies. My ride fell through at the last minute. Arranging alternative transport.",
            "Running about 30 minutes behind. Had to wait for a delivery that couldn't be rescheduled."
        ],
        funny: [
            "I'm late because I spent 10 minutes trying to convince my cat I don't work for her.",
            "Running behind — forgot how pants work this morning. Figured it out now.",
            "Sorry I'm late. Got stuck behind a funeral procession... for my motivation.",
            "Apologies for the delay. My snooze button and I were in a very committed relationship this morning.",
            "I'm late because I tried to leave the house three times but kept forgetting something. I'm basically a sitcom character.",
            "Running behind schedule. Traffic was invented by someone who hates me personally.",
            "Sorry, I got lost in my own neighborhood. Yes, I've lived here for three years.",
            "I'm late because my coffee maker betrayed me this morning. Still processing the trauma.",
            "Apologies. I was held hostage by a really good breakfast burrito.",
            "Running late — had an intense staring contest with my reflection. Lost.",
            "Sorry I'm late. Spent 15 minutes looking for my phone. It was in my hand.",
            "Apologies for the delay. My brain doesn't start working until 10am and it's not even negotiable.",
            "I'm late because the universe is testing my commitment to this job. So far, I'm passing barely.",
            "Running behind — forgot humans need to sleep at night, not just scroll endlessly.",
            "Sorry, I got dressed, looked in the mirror, and had to start over. Three times.",
            "I'm late because I couldn't decide which podcast to listen to on the commute. Paralysis by analysis.",
            "Apologies. My bed was very convincing this morning. Made some excellent points.",
            "Running behind schedule. Got caught in a YouTube rabbit hole about penguins at 6am.",
            "Sorry I'm late. Tried to adult this morning and it went poorly.",
            "I'm late because I left on time but forgot I'm slow. Mathematical error on my part."
        ]
    },
    
    'missed-deadline': {
        title: 'Missed a deadline',
        description: 'Failed to complete work by due date',
        serious: [
            "I sincerely apologize for missing the deadline. I underestimated the scope and ran into technical difficulties.",
            "I'm sorry I didn't deliver on time. I had some unexpected personal issues that impacted my schedule.",
            "Apologies for the delay. I encountered complications that took longer to resolve than anticipated.",
            "I take full responsibility for missing the deadline. Can I have until end of day tomorrow to complete this properly?",
            "Sorry for not meeting the deadline. I had a family emergency that required my immediate attention.",
            "I apologize for the late delivery. I was dealing with a health issue that affected my productivity.",
            "I'm sorry this is late. I had competing priorities and misjudged how long this would take.",
            "Apologies for missing the deadline. There were dependencies on other team members that caused delays.",
            "I should have communicated earlier, but I've been struggling with some technical challenges. Working to resolve them now.",
            "Sorry for the delay. I've had internet connectivity issues that prevented me from completing this on time.",
            "I apologize for not delivering as promised. I encountered data issues that required additional troubleshooting.",
            "I'm sorry this is overdue. I had a bereavement in the family that took me away from work.",
            "Apologies for the missed deadline. I was dealing with a home emergency that couldn't wait.",
            "I take responsibility for this delay. Can we discuss a realistic new timeline?",
            "Sorry for not meeting the deadline. I was out sick and am still catching up.",
            "I apologize for the delay. There were last-minute changes to requirements that set me back.",
            "I'm sorry this is late. I had childcare issues that disrupted my work schedule.",
            "Apologies for missing the deadline. I underestimated the complexity and should have asked for help sooner.",
            "Sorry for the delay. I've been dealing with a personal crisis that affected my focus.",
            "I apologize for not delivering on time. I had to prioritize an urgent client issue that came up."
        ],
        funny: [
            "I missed the deadline because time is a social construct and I'm trying to live authentically.",
            "Sorry this is late. I was busy inventing new and creative ways to procrastinate.",
            "I didn't meet the deadline because my motivation took a vacation without telling me.",
            "Apologies for the delay. Turns out 'I work better under pressure' was a lie I told myself.",
            "I'm late because I spent three days perfecting something that was due yesterday. It's very good though.",
            "Sorry, I missed the deadline while I was busy missing other deadlines. It's a whole system.",
            "I didn't deliver on time because I was convinced today was yesterday. Calendar is fake news.",
            "Apologies. I was trapped in a vortex of perfectionism and self-doubt. Still climbing out.",
            "I'm late because I thought 'due Friday' meant 'Friday of some week, eventually.'",
            "Sorry this is overdue. My dog ate my productivity. No, really.",
            "I missed the deadline because I made the classic blunder of thinking I could 'just wing it.'",
            "Apologies for the delay. I was busy creating elaborate excuses instead of just doing the work.",
            "I'm late because I confused 'deadline' with 'suggestion.' My mistake.",
            "Sorry, I got distracted by the existential dread of having a deadline in the first place.",
            "I didn't finish on time because I was optimistic about my abilities. Won't make that mistake again.",
            "Apologies for missing the deadline. I was working on it in my mind. Does that count?",
            "I'm late because I believed in myself too much. Overconfidence is a killer.",
            "Sorry this is overdue. I experienced what scientists call 'catastrophic task paralysis.'",
            "I missed the deadline because I kept finding things that were slightly more interesting. So, everything.",
            "Apologies. I thought I had more time because I forgot how time works. Rookie error."
        ]
    },
    
    'forgot-birthday': {
        title: 'Forgot a birthday',
        description: 'Missed someone\'s special day',
        serious: [
            "I'm so sorry I forgot your birthday. There's no excuse — I feel terrible about it.",
            "I apologize for missing your birthday. I've been overwhelmed lately, but that's not an excuse. Can I take you out this week?",
            "I'm really sorry I forgot your birthday. You deserve better. Let me make it up to you.",
            "I feel awful for forgetting your birthday. I've had a lot on my mind, but you're important to me.",
            "I'm so sorry. Your birthday completely slipped my mind. Can we celebrate this weekend?",
            "I apologize for forgetting your birthday. I've been dealing with some personal issues, but I should have remembered.",
            "I'm sorry I missed your special day. I have no good excuse. You mean a lot to me.",
            "I feel terrible about forgetting your birthday. I've been scattered lately. Let me take you to dinner.",
            "I'm really sorry. I marked it wrong in my calendar and completely missed it.",
            "I apologize for not remembering your birthday. I was traveling and lost track of dates.",
            "I'm so sorry I forgot. I've been having a rough time, but that doesn't excuse missing your day.",
            "I feel awful about this. Can I still get you a gift and celebrate late?",
            "I'm sorry for missing your birthday. I've been so focused on work that I lost sight of what matters.",
            "I apologize for forgetting. You're important to me and I should have had it marked everywhere.",
            "I'm really sorry. My phone died and I missed all my reminders. That's on me.",
            "I feel terrible for missing your birthday. I've been dealing with family stuff but I should have remembered.",
            "I'm so sorry. I thought it was next week. That's completely my fault.",
            "I apologize for forgetting your special day. Let me make it up to you properly.",
            "I'm sorry I missed it. I've been in my own head too much lately. You deserve better.",
            "I feel awful about this. Can we do a belated celebration? My treat, of course."
        ],
        funny: [
            "I forgot your birthday because I was too busy aging myself. The years blend together now.",
            "Sorry I missed your birthday. I was celebrating the fact that you're another year wiser than me.",
            "I forgot because birthdays are just Earth completing another lap around the sun. You're still you! (But seriously, I'm sorry.)",
            "I'm sorry I forgot your birthday. I was distracted by my own mortality. You know how it is.",
            "I missed your birthday because time is an illusion and I'm living proof.",
            "Sorry! I forgot your birthday while I was busy forgetting literally everything else too.",
            "I'm sorry. I thought your birthday was next month. Turns out I can't calendar.",
            "I forgot your birthday because my brain is like a browser with 47 tabs open and one is playing music but I don't know which one.",
            "Sorry I missed it. I was busy pretending I have my life together. Clearly, I don't.",
            "I forgot your birthday because I'm still processing that this year happened at all.",
            "I'm sorry. My memory has the storage capacity of a goldfish with amnesia.",
            "I missed your birthday because I was convinced it was three weeks from now. Math is hard.",
            "Sorry! I forgot because I'm getting older and my brain is now more vibes than facts.",
            "I forgot your birthday while simultaneously remembering every embarrassing thing I've ever done. Brain prioritization is weird.",
            "I'm sorry. I was too busy being a disappointment in other areas to remember.",
            "I missed it because I thought Facebook would remind me. I've overestimated technology again.",
            "Sorry I forgot. My internal calendar app crashed and hasn't rebooted since 2019.",
            "I forgot your birthday because I'm still figuring out what month it is.",
            "I'm sorry. I was busy being wrong about literally everything, including your birthday.",
            "I missed your birthday because the universe is testing how many ways I can mess up. Spoiler: a lot."
        ]
    },

    'missed-anniversary': {
    title: 'Missed anniversary',
    description: 'Forgot an important anniversary date',
    serious: [
        "I'm so sorry I forgot our anniversary. There's no excuse for this — you deserve better.",
        "I feel terrible about missing our anniversary. I've been overwhelmed, but that's not an excuse. Can I make it up to you this weekend?",
        "I apologize for forgetting our anniversary. I had the date wrong in my calendar and I'm genuinely sorry.",
        "I'm really sorry I missed our anniversary. I've been dealing with some stressful situations, but I should have remembered.",
        "I feel awful about forgetting our anniversary. Let me take you out this week and celebrate properly.",
        "I'm so sorry. Our anniversary completely slipped my mind with everything going on. You mean the world to me.",
        "I apologize for missing our anniversary. I have no good excuse and I feel terrible about it.",
        "I'm really sorry I forgot. I've been scattered lately, but that doesn't excuse forgetting something so important.",
        "I feel horrible about this. Can we celebrate this weekend? I want to make it special.",
        "I'm so sorry for forgetting our anniversary. I marked it wrong in my phone and didn't realize until now.",
        "I apologize deeply for missing this important day. You deserve someone who remembers, and I'll do better.",
        "I'm sorry I forgot our anniversary. I've been distracted by work, but that's not a good enough reason.",
        "I feel terrible. Can I take you to your favorite restaurant this week to make up for it?",
        "I'm really sorry. I thought it was next week and I feel awful for getting it wrong.",
        "I apologize for forgetting our anniversary. I've been dealing with family issues but I should have remembered.",
        "I'm so sorry. This is important to you and I dropped the ball. Let me make it right.",
        "I feel awful about missing our anniversary. I have no excuse and I'm truly sorry.",
        "I'm sorry I forgot. I've been overwhelmed lately but that doesn't make it okay.",
        "I apologize for missing this special day. You're important to me and I should have had it memorized.",
        "I'm really sorry. Can we do something special this weekend to celebrate, even if it's late?"
    ],
    funny: [
        "I forgot our anniversary because my brain decided to prioritize remembering every embarrassing thing I've ever done instead.",
        "Sorry I missed our anniversary. I was busy celebrating the anniversary of all my other mistakes.",
        "I forgot because I thought love was timeless, which apparently doesn't apply to anniversaries. My bad.",
        "I'm sorry. I forgot our anniversary while perfectly remembering the WiFi password from a hotel we stayed at in 2019.",
        "I missed it because my brain has the memory capacity of a goldfish, but the anxiety of an entire school of piranhas.",
        "Sorry I forgot. Turns out 'I'll definitely remember this time' is just something I say, not something I do.",
        "I forgot our anniversary because my phone reminded me about a dental appointment from 2022 instead. Technology has betrayed us both.",
        "I'm sorry. I was too busy remembering song lyrics from the 90s to remember the most important date of the year.",
        "I missed it because I assumed my future self would have things more together. Plot twist: I don't.",
        "Sorry I forgot. My brain filed it under 'things I'll definitely remember' which is apparently where information goes to die.",
        "I forgot our anniversary while simultaneously remembering every Netflix password I've ever created.",
        "I'm sorry. I was distracted by the existential dread of getting older, which made me forget we're getting older together.",
        "I missed it because I thought 'time is a construct' was a valid calendar strategy. Spoiler: it's not.",
        "Sorry I forgot. I've been operating on vibes and chaos, and apparently important dates don't survive that system.",
        "I forgot because my brain decided to use that storage space for memorizing random facts about penguins instead.",
        "I'm sorry. I remembered that it was important, I just forgot when, where, and that it was today.",
        "I missed our anniversary because I'm basically a smartphone with 1% battery at all times.",
        "Sorry I forgot. I was too busy being bad at other things to excel at remembering this one important thing.",
        "I forgot because I have the organizational skills of a sock drawer after laundry day.",
        "I'm sorry. I was convinced it was next month, which is just my brain's way of being confidently incorrect."
    ]
},

'late-for-school': {
    title: 'Late for school',
    description: 'Running behind for class or school',
    serious: [
        "I'm sorry I'm late. My alarm didn't go off this morning and I just woke up.",
        "Apologies for being late. There was an issue with the bus route and it took longer than expected.",
        "I'm running late due to a family situation this morning. I'm on my way now.",
        "Sorry I'm late. I had a medical appointment that ran over.",
        "I apologize for the tardiness. My ride fell through at the last minute and I had to find alternative transportation.",
        "I'm late because there was unexpected traffic on my usual route this morning.",
        "Sorry for being late. I had to help my younger sibling with an emergency before leaving.",
        "I apologize for being late. My parent's car wouldn't start and we had to arrange another ride.",
        "I'm running behind because I missed my bus and had to wait for the next one.",
        "Sorry I'm late. There was a family emergency I had to help with this morning.",
        "I apologize for the delay. I had to drop off a family member unexpectedly.",
        "I'm late because my usual transportation wasn't available today.",
        "Sorry for being tardy. I overslept and left as soon as I woke up.",
        "I apologize for being late. There was road construction on my route that I wasn't aware of.",
        "I'm running late due to a doctor's appointment that couldn't be scheduled at another time.",
        "Sorry I'm late. I had to handle an urgent situation at home before leaving.",
        "I apologize for the tardiness. My alarm clock malfunctioned and didn't wake me up.",
        "I'm late because the train was delayed this morning.",
        "Sorry for being late. I had a personal issue I needed to address before coming to school.",
        "I apologize for being tardy. There was a mix-up with my schedule this morning."
    ],
    funny: [
        "I'm late because I spent 15 minutes arguing with my closet about what to wear. The closet won.",
        "Sorry I'm late. I forgot that school starts at a specific time and not just 'eventually.'",
        "I'm tardy because my bed made some very compelling arguments about why I should stay home.",
        "Apologies for being late. I was on time in my dreams, so this is very confusing for me.",
        "I'm late because I hit snooze so many times my alarm gave up on me entirely.",
        "Sorry I'm late. I thought 'fashionably late' applied to school. Turns out it doesn't.",
        "I'm tardy because getting ready involves 47 different distractions and I fell for every single one.",
        "Apologies. I was late because I suddenly couldn't remember if I turned off the stove I didn't even use.",
        "I'm late because my brain doesn't fully boot up until 10am and school starts before then.",
        "Sorry I'm late. I lost track of time while having an existential crisis about homework.",
        "I'm tardy because I took the 'scenic route' which is code for 'got completely lost.'",
        "Apologies for being late. I was detained by my pet who refused to let me leave.",
        "I'm late because I operate on a different time zone emotionally.",
        "Sorry I'm late. I made the rookie mistake of thinking I had more time than physics allows.",
        "I'm tardy because I spent too long contemplating whether my socks match. They don't, and I'm late.",
        "Apologies. I'm late because I forgot I'm not a morning person until it was too late.",
        "I'm late because I thought I could 'just check' my phone for one second. That was 30 minutes ago.",
        "Sorry I'm late. My sense of urgency is still buffering.",
        "I'm tardy because I overestimated my ability to function before noon.",
        "Apologies for being late. I zigged when I should have zagged, and here we are."
    ]
},

'no-homework': {
    title: 'No homework',
    description: 'Didn\'t complete homework assignment',
    serious: [
        "I'm sorry I don't have my homework. I was dealing with a family situation last night and couldn't complete it.",
        "I apologize for not having my homework. I had technical issues with my computer and lost my work.",
        "I'm sorry, I don't have the assignment. I was sick yesterday and wasn't able to finish it.",
        "I apologize for not completing the homework. I had to work late to help my family and ran out of time.",
        "I'm sorry I don't have it. There was a power outage at my house and I couldn't access my materials.",
        "I apologize for not having my homework done. I had a family emergency that took up my evening.",
        "I'm sorry, I didn't finish the assignment. I misunderstood the due date and thought it was later this week.",
        "I apologize for not completing it. I had multiple assignments due and I prioritized incorrectly.",
        "I'm sorry I don't have my homework. My internet was down and I couldn't access the online resources I needed.",
        "I apologize for not having it done. I had to take care of a sick family member last night.",
        "I'm sorry, I don't have the assignment. My computer crashed and I lost all my progress.",
        "I apologize for not completing the homework. I had conflicting commitments and couldn't manage my time properly.",
        "I'm sorry I don't have it. I left it at home by accident this morning.",
        "I apologize for not having my homework. I was dealing with a personal issue that required my attention.",
        "I'm sorry, I didn't complete it. I had transportation issues and got home very late.",
        "I apologize for not having the assignment done. I had a medical appointment that took longer than expected.",
        "I'm sorry I don't have my homework. There was a technical glitch and my file got corrupted.",
        "I apologize for not completing it. Can I turn it in tomorrow after school?",
        "I'm sorry, I don't have it finished. I underestimated how long it would take and ran out of time.",
        "I apologize for not having my homework. I can have it completed by tomorrow morning."
    ],
    funny: [
        "I don't have my homework because my dog ate it. And by dog, I mean procrastination. Procrastination ate my homework.",
        "Sorry, I don't have it. My homework is currently in a complicated relationship with my backpack, and they're both missing.",
        "I don't have my homework because I accidentally saved it in the same place I save all my good intentions.",
        "Sorry, I didn't do it. I was busy preparing an elaborate excuse, which ironically took longer than the homework would have.",
        "I don't have my homework because I thought 'due tomorrow' meant 'do tomorrow,' and I stand by this logic.",
        "Sorry, I don't have it. My homework and I had a disagreement about priorities. The homework lost.",
        "I don't have my homework because I got distracted by the internet, which is basically homework's natural predator.",
        "Sorry, I didn't finish it. I was waiting for motivation to arrive, but apparently it's stuck in traffic.",
        "I don't have my homework because I made the classic blunder of thinking I'd 'do it later.'",
        "Sorry, I don't have it. My brain decided that remembering song lyrics from 2008 was more important than homework.",
        "I don't have my homework because I was trapped in a Netflix vortex. It was very serious and very educational.",
        "Sorry, I didn't do it. I had a conflict between my homework and my desire to do literally anything else.",
        "I don't have my homework because my focus had other plans last night, none of which involved productivity.",
        "Sorry, I don't have it. I put all my effort into looking like someone who did their homework instead of actually doing it.",
        "I don't have my homework because I confused 'thinking about doing it' with 'actually doing it.'",
        "Sorry, I didn't finish. My homework is on the same 'to-do list' as organizing my life, so... you see the problem.",
        "I don't have my homework because I was busy mastering the ancient art of procrastination. I'm very good at it now.",
        "Sorry, I don't have it. My homework went to the same place as my motivation and my car keys.",
        "I don't have my homework because I got caught in a YouTube rabbit hole about how paper is made, which feels relevant somehow.",
        "Sorry, I didn't do it. I thought I was having a productive evening, but it turns out I was just anxious about homework."
    ]
},

'failed-test': {
    title: 'Failed a test',
    description: 'Did poorly on an exam or test',
    serious: [
        "I'm disappointed with my test results. I didn't prepare as well as I should have and I take full responsibility.",
        "I know I didn't do well on the test. I was dealing with some personal issues that affected my focus, but I plan to do better.",
        "I'm sorry about my test score. I underestimated the material and didn't study enough. Can I do extra credit?",
        "I didn't do well on the test because I've been struggling with this subject. Is tutoring available?",
        "I'm disappointed in my performance. I had difficulty understanding some of the concepts and should have asked for help sooner.",
        "I know my test score is low. I was sick leading up to the exam and it affected my preparation.",
        "I didn't do well because I mismanaged my study time. I'd like to discuss how I can improve.",
        "I'm sorry about my test results. I've been having trouble balancing multiple subjects and need to improve my time management.",
        "I didn't perform well because I didn't fully understand the material. Can we review what I got wrong?",
        "I know I failed. I was overconfident and didn't study as thoroughly as I needed to.",
        "I'm disappointed with my score. I had anxiety during the test that affected my performance.",
        "I didn't do well because I focused on the wrong material while studying. I need better guidance on what to prioritize.",
        "I know my test score is poor. I've been dealing with family issues that have been distracting me.",
        "I'm sorry about my performance. I didn't practice enough and I see where I went wrong now.",
        "I didn't do well on the test. Is there an opportunity to retake it or do a makeup assignment?",
        "I know I failed. I need to develop better study habits and I'm willing to put in the work.",
        "I'm disappointed in my results. I let test anxiety get the better of me this time.",
        "I didn't perform well because I crammed at the last minute instead of studying consistently.",
        "I know my score is low. Can we set up a time to go over the material I struggled with?",
        "I'm sorry about my test results. I need to take this subject more seriously and I will going forward."
    ],
    funny: [
        "I failed the test because I studied the wrong chapter. On the bright side, I'm now an expert in something completely irrelevant.",
        "Sorry about my test score. I spent more time worrying about failing than actually studying, which is peak irony.",
        "I failed because my brain decided test day was the perfect time to remember every song lyric ever, but zero actual test material.",
        "Sorry, I didn't do well. I thought 'multiple choice' meant I had multiple chances. Turns out it doesn't.",
        "I failed the test because I confused 'studying' with 'staring at my notes and hoping for osmosis.'",
        "Sorry about my score. I prepared for the wrong test. Unfortunately, 'life' wasn't the subject being tested.",
        "I failed because I was operating under the assumption that I'd absorbed information through sheer proximity to the textbook.",
        "Sorry, I didn't pass. My brain went on vacation during the test and didn't send a postcard.",
        "I failed the test because I have a PhD in procrastination but only a kindergarten level in time management.",
        "Sorry about my score. I studied hard, just not for this particular test. Or subject. Or class.",
        "I failed because my test-taking strategy was 'guess and hope for the best.' Strategy needs work.",
        "Sorry, I didn't do well. I spent more time perfecting my 'I'm totally fine' face than actually studying.",
        "I failed the test because I thought confidence could replace knowledge. Science has proven me wrong.",
        "Sorry about my score. I was fully prepared for a different reality where I knew the answers.",
        "I failed because I mixed up 'studying the night before' with 'panicking the night before.' Easy mistake.",
        "Sorry, I didn't pass. My brain decided that test time was perfect for thinking about literally everything except the test.",
        "I failed because I studied just enough to be dangerous but not enough to be correct.",
        "Sorry about my score. I brought a calculator to an English test, which should tell you everything about my preparation.",
        "I failed the test because I thought 'open book' meant 'open Google.' Reader, it did not.",
        "Sorry, I didn't do well. I have the knowledge somewhere in my brain, just not in the part that functions during tests."
    ]
},

'missed-date': {
    title: 'Missed a date',
    description: 'Forgot or didn\'t show up for a date',
    serious: [
        "I'm so sorry I missed our date. I completely lost track of time and I feel terrible about standing you up.",
        "I apologize for not showing up. There was a family emergency that I had to deal with immediately.",
        "I'm really sorry I missed our date. I got the time wrong and by the time I realized, it was too late. Can we reschedule?",
        "I feel awful about missing our date. I had an unexpected work situation that I couldn't get out of.",
        "I'm so sorry. I was in an accident (everyone's okay) but it completely derailed my evening. Can I make it up to you?",
        "I apologize for standing you up. I had a personal crisis and I should have texted you. I'm truly sorry.",
        "I'm really sorry I didn't show up. I fell asleep after a long day and completely missed it. That's on me.",
        "I feel terrible about missing our date. I had car trouble and by the time I got help, it was too late to make it.",
        "I'm so sorry. I got called into work for an emergency and couldn't get away. I should have communicated better.",
        "I apologize for not showing up. I had a family obligation come up that I couldn't postpone.",
        "I'm really sorry I missed our date. I've been dealing with some health issues and I wasn't feeling well enough to go out.",
        "I feel awful about this. Can I take you out this weekend and make it up to you properly?",
        "I'm so sorry. I mixed up the dates in my calendar and I'm genuinely disappointed I missed seeing you.",
        "I apologize for standing you up. I had an emergency with my pet and had to take them to the vet.",
        "I'm really sorry I didn't make it. I got stuck in terrible traffic and my phone died so I couldn't let you know.",
        "I feel terrible about missing our date. I have no good excuse and you deserved better communication from me.",
        "I'm so sorry. I was dealing with a stressful situation and completely spaced on our plans. That's not okay.",
        "I apologize for not showing up. I'd really like another chance if you're willing to give me one.",
        "I'm really sorry I missed our date. I take full responsibility and I understand if you're upset.",
        "I feel awful about this. You didn't deserve to be stood up and I'd love the opportunity to make it right."
    ],
    funny: [
        "I missed our date because I fell into a time vortex, also known as 'one more episode.' My sense of time is deeply flawed.",
        "Sorry I stood you up. I was busy having an anxiety attack about our date instead of, you know, actually going on the date.",
        "I missed our date because I got ready, looked in the mirror, and decided I needed a complete life reboot. Still working on that.",
        "Sorry I didn't show up. I was trapped in my apartment by a series of poor decisions and commitment issues. Mostly mine.",
        "I missed our date because I convinced myself you'd be better off without me showing up. Self-sabotage is my cardio.",
        "Sorry I stood you up. I spent so long preparing what to say that I forgot to actually show up to say it.",
        "I missed our date because I got lost on the way to confidence and ended up in the land of 'maybe just stay home.'",
        "Sorry I didn't show. I was busy catastrophizing about all the ways the date could go wrong instead of just going.",
        "I missed our date because my anxiety said 'what if you're boring' and I believed it. Working on that.",
        "Sorry I stood you up. I rehearsed our conversation so many times I thought I'd actually lived it already.",
        "I missed our date because I took 'fashionably late' too literally and ended up just being absent.",
        "Sorry I didn't show. I was paralyzed by the question 'what if I have nothing interesting to say' so I said nothing by not going.",
        "I missed our date because I fell down a spiral of self-doubt that started with 'what should I wear' and ended with existential dread.",
        "Sorry I stood you up. I convinced myself I'd accidentally gotten the day wrong, then confirmed I hadn't, then forgot to go anyway.",
        "I missed our date because I spent three hours building up courage and then my courage took a nap.",
        "Sorry I didn't show up. My brain decided that overthinking everything was more productive than actually doing the thing.",
        "I missed our date because I'm apparently allergic to my own happiness. Getting that checked out.",
        "Sorry I stood you up. I achieved peak indecisiveness about whether to go and solved it by... not deciding at all.",
        "I missed our date because I got distracted by panic-cleaning my apartment even though you were never coming over.",
        "Sorry I didn't show. I'm working on the theory that if I disappoint you now, I can't disappoint you later. Theory needs work."
    ]
},

'forgot-text': {
    title: 'Forgot to text back',
    description: 'Didn\'t respond to messages',
    serious: [
        "I'm sorry I didn't text back. I saw your message and meant to respond, then completely forgot.",
        "Apologies for the delayed response. I've been overwhelmed with work and let messages slip through the cracks.",
        "I'm sorry I didn't reply. My phone was on silent and I didn't see your message until now.",
        "I apologize for not texting back. I read your message at a bad time and forgot to respond later.",
        "I'm sorry for the late response. I've been dealing with some personal issues and haven't been great about checking my phone.",
        "Apologies for not replying sooner. I saw your text while I was busy and it got buried under other notifications.",
        "I'm sorry I didn't respond. I've had a lot going on and haven't been keeping up with messages like I should.",
        "I apologize for the delayed response. My phone died and I didn't charge it until this morning.",
        "I'm sorry I didn't text back right away. I wanted to give you a thoughtful response and kept putting it off.",
        "Apologies for not replying. I saw your message but was in a meeting and then completely forgot to respond afterward.",
        "I'm sorry for the late response. I've been traveling and haven't had consistent phone service.",
        "I apologize for not texting back. I read your message when I couldn't respond and then it slipped my mind.",
        "I'm sorry I didn't reply sooner. I've been trying to be less on my phone and I missed your message.",
        "Apologies for the delayed response. I genuinely thought I had already replied to you.",
        "I'm sorry for not texting back. I've had family stuff going on and haven't been responsive.",
        "I apologize for not replying. I saw your message late at night and didn't want to text back at a weird hour.",
        "I'm sorry I didn't respond. I've been really scattered lately and dropped the ball on several conversations.",
        "Apologies for the late response. My phone notifications haven't been working properly.",
        "I'm sorry for not texting back sooner. I needed time to think about my response and then forgot to actually send it.",
        "I apologize for the delayed response. I have no good excuse — I just forgot and I'm sorry."
    ],
    funny: [
        "Sorry I didn't text back. I opened your message, said 'I'll reply in a second,' and that second lasted three days.",
        "I forgot to text back because I marked your message as 'read' which my brain interpreted as 'replied.' Brain is wrong.",
        "Sorry I didn't respond. I composed the perfect reply in my head and assumed that counted as actually sending it.",
        "I forgot to text back because I suffer from a condition where I think about replying so hard that I believe I already did.",
        "Sorry I didn't respond. I was waiting for the right moment, which apparently is now, three weeks later.",
        "I forgot to text back because I read your message while simultaneously doing seven other things and retained none of it.",
        "Sorry I didn't reply. I opened your text, got distracted by a notification about a sale, and entered a shopping dimension.",
        "I forgot to text back because my phone is a black hole where good intentions go to die.",
        "Sorry I didn't respond. I thought I replied but turns out I just rehearsed what I'd say and never actually sent it.",
        "I forgot to text back because I have the memory of a goldfish and the attention span of... sorry, what were we talking about?",
        "Sorry I didn't reply. I saw your message at 3am, said 'I'll respond in the morning,' and my morning self has no recollection of this plan.",
        "I forgot to text back because I accidentally swiped away your notification and my brain immediately deleted all evidence of your existence.",
        "Sorry I didn't respond. I read your text, formulated a response, then my brain said 'save draft' but my phone said 'lol no.'",
        "I forgot to text back because I exist in a perpetual state of 'I'll do it later' and later never comes.",
        "Sorry I didn't reply. I started typing a response, got existentially overwhelmed, and just... stopped existing for a while.",
        "I forgot to text back because I'm running on a Windows 95 operating system and everything takes 3-5 business days to process.",
        "Sorry I didn't respond. I saw your text while I was busy and then my brain filed it under 'already handled' even though it wasn't.",
        "I forgot to text back because my notifications and I have a complicated relationship where we both pretend the other doesn't exist.",
        "Sorry I didn't reply. I read your message, thought 'wow I should respond to that,' and then immediately forgot I thought that.",
        "I forgot to text back because I operate on vibes and chaos, and responding to messages didn't make the vibe list this week."
    ]
},

'double-booked': {
    title: 'Double booked',
    description: 'Accidentally scheduled two things at once',
    serious: [
        "I'm so sorry, but I just realized I double-booked myself. I have a prior commitment at the same time. Can we reschedule?",
        "I apologize, but I made a scheduling error and have conflicting appointments. Can we find another time that works?",
        "I'm really sorry, but I accidentally scheduled two things at once. I need to honor my first commitment. When else works for you?",
        "I apologize for the confusion. I didn't check my calendar properly and have a conflict. Can we move to another day?",
        "I'm sorry, but I double-booked myself by mistake. I have a family obligation at that time. Are you free tomorrow instead?",
        "I apologize for this scheduling conflict. I have a work commitment I can't change. Could we do next week?",
        "I'm really sorry, but I overlooked an existing appointment when I scheduled with you. Can we reschedule for later this week?",
        "I apologize for the mix-up. I have a prior commitment that I forgot about. When would be a better time for you?",
        "I'm sorry, but I realized I have overlapping appointments. I need to stick with my original plans. Can we find another time?",
        "I apologize for double-booking. I have a medical appointment at that time that I can't move. Are you available the day after?",
        "I'm really sorry, but I made an error with my schedule. I have a class at that time. Can we meet earlier or later?",
        "I apologize for the scheduling conflict. I have a family event I committed to first. Could we do lunch instead of dinner?",
        "I'm sorry, but I double-booked myself. I have an important work meeting. Can we push our meeting to the afternoon?",
        "I apologize for this mistake. I have a prior obligation with someone else. Would next Monday work for you?",
        "I'm really sorry, but I have a conflict I didn't catch. I need to honor my first commitment. When are you next available?",
        "I apologize for the confusion. I have overlapping commitments and need to reschedule with you. Is next week open?",
        "I'm sorry for double-booking. I have a standing appointment at that time I forgot about. Can we do a different day?",
        "I apologize for this scheduling error. I have a commitment I can't break. Would Thursday work instead?",
        "I'm really sorry, but I made a mistake with my calendar. I have a prior engagement. Can we find another time soon?",
        "I apologize for the mix-up. I have a conflict that I can't resolve. When else works well for you?"
    ],
    funny: [
        "I double-booked myself because I'm living in multiple timelines and they just collided. Physics is complicated.",
        "Sorry I double-booked. I have the calendar management skills of someone who thinks 'I'll remember' is a system.",
        "I double-booked myself because I'm optimistic about my ability to be in two places at once. Still working on teleportation.",
        "Sorry for the conflict. I scheduled two things at the same time because apparently I think I'm a wizard. I'm not.",
        "I double-booked myself because my calendar and my brain are in a fight and neither one is winning.",
        "Sorry I double-booked. I operate under the delusion that future me will figure it out. Future me is panicking.",
        "I double-booked myself because I said yes to everything and assumed the universe would sort it out. It didn't.",
        "Sorry for the scheduling conflict. I have the time management skills of a toddler with a sugar high.",
        "I double-booked myself because I thought I could bend the space-time continuum through sheer willpower. Update: I can't.",
        "Sorry I double-booked. My calendar looks like a game of Tetris played by someone who's never seen Tetris.",
        "I double-booked myself because I'm a 'yes person' who forgot that time is linear and I can't split myself in half.",
        "Sorry for the conflict. I scheduled two things at once because I have the memory of a goldfish in a snowstorm.",
        "I double-booked myself because I'm living proof that having a calendar and using a calendar are two different skills.",
        "Sorry I double-booked. I thought I could master the art of being everywhere at once. I was wrong.",
        "I double-booked myself because I schedule things the way I pack for trips: chaotically and with too much optimism.",
        "Sorry for the scheduling conflict. I double-booked because I temporarily forgot how time works.",
        "I double-booked myself because I have the organizational skills of a tornado in a filing cabinet.",
        "Sorry I double-booked. I'm running on hope, vibes, and a calendar system that I clearly don't understand.",
        "I double-booked myself because I thought 'I'll figure it out later' was a valid scheduling strategy. It's not.",
        "Sorry for the conflict. I double-booked because my brain said 'you can do both' and my brain is a known liar."
    ]
},

'fell-asleep': {
    title: 'Fell asleep',
    description: 'Fell asleep when you should have been awake',
    serious: [
        "I'm so sorry I fell asleep. I had an exhausting day and dozed off unintentionally.",
        "I apologize for falling asleep. I haven't been sleeping well lately and it caught up with me.",
        "I'm really sorry I fell asleep. I've been working long hours and I was more tired than I realized.",
        "I apologize for dozing off. I had taken medication that made me drowsy and I couldn't fight it.",
        "I'm sorry I fell asleep. I should have gotten more rest beforehand so this wouldn't happen.",
        "I apologize for falling asleep. I've been dealing with insomnia and finally crashed at the wrong time.",
        "I'm really sorry I dozed off. I had an early morning and the exhaustion hit me all at once.",
        "I apologize for falling asleep. I've been feeling under the weather and my energy is very low.",
        "I'm sorry I fell asleep on you. I didn't realize how tired I was until I sat down.",
        "I apologize for dozing off. I've been burning the candle at both ends and my body gave out.",
        "I'm really sorry I fell asleep. I had a migraine earlier and the medication knocked me out.",
        "I apologize for falling asleep. I've been stressed and not sleeping properly, and it finally caught up with me.",
        "I'm sorry I dozed off. I had been up since 4am and couldn't keep my eyes open any longer.",
        "I apologize for falling asleep. I should have told you I was exhausted instead of trying to power through.",
        "I'm really sorry I fell asleep. I've been dealing with a health issue that causes extreme fatigue.",
        "I apologize for dozing off. I had a very physically demanding day and my body just shut down.",
        "I'm sorry I fell asleep. I didn't sleep at all last night and it finally caught up with me.",
        "I apologize for falling asleep. I've been on a tough work schedule and I'm completely drained.",
        "I'm really sorry I dozed off. I thought I could stay awake but I overestimated my energy level.",
        "I apologize for falling asleep. I take full responsibility and should have managed my rest better."
    ],
    funny: [
        "I fell asleep because my body staged a coup against my willpower. The body won decisively.",
        "Sorry I fell asleep. Turns out I'm not 'just resting my eyes,' I'm actually entering a coma.",
        "I fell asleep because consciousness is exhausting and my brain decided to clock out early.",
        "Sorry I dozed off. I fell asleep so fast I think I broke a personal record. Nobody clapped though.",
        "I fell asleep because my eyelids started a union and went on strike. Very sudden, very effective.",
        "Sorry I fell asleep. I blinked and my body took that as permission to enter sleep mode.",
        "I fell asleep because I'm basically a toddler in an adult body, and toddlers don't negotiate with naptime.",
        "Sorry I dozed off. I thought I was just 'resting' but my body had other, more unconscious plans.",
        "I fell asleep because my energy levels operate on a 'here one second, gone the next' system.",
        "Sorry I fell asleep. I have the sleep resistance of a laptop running 47 Chrome tabs.",
        "I fell asleep because my body said 'sleep now' and I wasn't consulted in this decision.",
        "Sorry I dozed off. I'm powered by a very unreliable battery that drains at inconvenient moments.",
        "I fell asleep because staying awake required effort and my brain voted 'no' on that proposal.",
        "Sorry I fell asleep. I got ambushed by my own exhaustion. Never saw it coming.",
        "I fell asleep because I'm running on a sleep deficit that would make economists weep.",
        "Sorry I dozed off. My consciousness briefly left the chat without warning.",
        "I fell asleep because I forgot that 'rest your eyes' is just code for 'pass out immediately.'",
        "Sorry I fell asleep. I was defeated by the comfort of sitting down. It was a short battle.",
        "I fell asleep because my circadian rhythm is more of a circadian suggestion, and I ignored it.",
        "Sorry I dozed off. I operated under the false belief that I could stay awake through sheer determination. I could not."
    ]
},

'no-show': {
    title: 'Didn\'t show up',
    description: 'Failed to appear for an event or commitment',
    serious: [
        "I'm so sorry I didn't show up. I had a family emergency that required my immediate attention.",
        "I apologize for not being there. I had a sudden illness and couldn't make it.",
        "I'm really sorry I didn't show up. I had car trouble and couldn't find alternative transportation in time.",
        "I apologize for my absence. I had an urgent work situation that I couldn't leave.",
        "I'm sorry I wasn't there. I completely mixed up the date and didn't realize until it was too late.",
        "I apologize for not showing up. I had a personal crisis that I had to deal with immediately.",
        "I'm really sorry I didn't make it. I had a medical issue that prevented me from coming.",
        "I apologize for my absence. I got stuck in an emergency situation and couldn't get away.",
        "I'm sorry I didn't show up. I should have communicated better when I realized I couldn't make it.",
        "I apologize for not being there. I had a family member who needed urgent help.",
        "I'm really sorry I didn't make it. I had a serious issue at home that required my attention.",
        "I apologize for not showing up. I take full responsibility for not reaching out sooner.",
        "I'm sorry I wasn't there. I had transportation issues and couldn't find a way to get there on time.",
        "I apologize for my absence. I had a conflict that came up that I couldn't resolve.",
        "I'm really sorry I didn't show up. I was dealing with an unexpected situation that took priority.",
        "I apologize for not being there. I had phone issues and couldn't contact you to let you know.",
        "I'm sorry I didn't make it. I mismanaged my time and didn't leave early enough to account for delays.",
        "I apologize for not showing up. I understand if you're upset and I'd like to make it up to you.",
        "I'm really sorry I wasn't there. I had a situation I couldn't avoid and couldn't get word to you.",
        "I apologize for my absence. I have no good excuse and I should have been more reliable."
    ],
    funny: [
        "I didn't show up because I got ready, looked at the door, and my anxiety said 'absolutely not today.'",
        "Sorry I didn't show up. I was fully prepared mentally but my physical body refused to cooperate.",
        "I didn't show up because I spent so long hyping myself up to go that I forgot to actually go.",
        "Sorry I wasn't there. I made it to my front door and then my introvert alarm went off. Very loud. Couldn't ignore it.",
        "I didn't show up because I convinced myself I'd be a burden and decided to burden no one by disappearing entirely.",
        "Sorry I didn't show up. I was trapped in the 'one more thing before I leave' dimension. Still there, actually.",
        "I didn't show up because I practiced conversations in my head so much that I thought I'd already been there.",
        "Sorry I wasn't there. I experienced what scientists call 'catastrophic social battery failure.'",
        "I didn't show up because I made the classic mistake of thinking I could do things. Spoiler: I can't.",
        "Sorry I didn't show up. My body said 'yes' but my brain said 'nice try' and I got outvoted.",
        "I didn't show up because I got distracted by the existential question 'do I really need to exist in public today?'",
        "Sorry I wasn't there. I was defeated by the final boss: leaving my house.",
        "I didn't show up because I spent all my energy deciding what to wear and had none left for actually going.",
        "Sorry I didn't show up. I made it to the parking lot and then had a full system reboot. Took a while.",
        "I didn't show up because I forgot that 'being places' requires actual physical movement, not just good intentions.",
        "Sorry I wasn't there. I was overwhelmed by the complexity of going outside and interacting with humans.",
        "I didn't show up because I took 'fashionably late' too far and ended up in 'fashionably absent' territory.",
        "Sorry I didn't show up. I spent so much time overthinking whether to go that the event ended.",
        "I didn't show up because I have the follow-through of a Netflix show that gets canceled after one season.",
        "Sorry I wasn't there. I convinced myself everyone would be better off without me showing up. Working on that logic."
    ]
},

'forgot-meeting': {
    title: 'Forgot a meeting',
    description: 'Missed a scheduled meeting or appointment',
    serious: [
        "I'm so sorry I missed the meeting. It completely slipped my mind and I take full responsibility.",
        "I apologize for missing the meeting. I didn't have it in my calendar and forgot about it entirely.",
        "I'm really sorry I wasn't there. I had a conflict that I didn't realize overlapped with our meeting time.",
        "I apologize for missing the meeting. I was dealing with an urgent matter and lost track of time.",
        "I'm sorry I forgot about our meeting. I've been overwhelmed with deadlines and it slipped through the cracks.",
        "I apologize for not being there. I had the wrong time written down and missed it.",
        "I'm really sorry I missed the meeting. I thought it was tomorrow and I completely miscalculated.",
        "I apologize for my absence. I had a family situation that took priority, but I should have notified you.",
        "I'm sorry I forgot about the meeting. My calendar notifications weren't working properly.",
        "I apologize for missing it. Can someone fill me in on what was discussed? I'll make sure to be at the next one.",
        "I'm really sorry I wasn't there. I had the meeting down for the wrong day and didn't catch my error.",
        "I apologize for forgetting about the meeting. I've had a lot on my plate and I dropped the ball.",
        "I'm sorry I missed it. I was in back-to-back meetings and lost track of my schedule.",
        "I apologize for not attending. I had a personal emergency that I had to deal with immediately.",
        "I'm really sorry I forgot about the meeting. I should have set multiple reminders.",
        "I apologize for my absence. I was out sick and didn't realize the meeting was scheduled for today.",
        "I'm sorry I missed the meeting. I had a client emergency that required my immediate attention.",
        "I apologize for forgetting. I take full responsibility and will ensure this doesn't happen again.",
        "I'm really sorry I wasn't there. Can we schedule a quick catch-up so I can get up to speed?",
        "I apologize for missing the meeting. I understand this is unprofessional and I'll do better going forward."
    ],
    funny: [
        "I forgot about the meeting because my brain is running on a 'vibes only' calendar system and meetings don't have good vibes.",
        "Sorry I missed the meeting. I put it in my calendar and my calendar promptly hid it from me out of spite.",
        "I forgot about the meeting because I have the memory retention of a goldfish in witness protection.",
        "Sorry I wasn't there. I remembered the meeting at exactly the time the meeting ended. Perfect timing.",
        "I forgot about the meeting because my brain archived it in the same folder as 'things I'll definitely remember.' That folder is empty.",
        "Sorry I missed it. I spent so much time dreading the meeting that I forgot to actually attend the meeting.",
        "I forgot about the meeting because my notification system consists of hope and chaos, neither of which are reliable.",
        "Sorry I wasn't there. My brain said 'that meeting is definitely next week' and my brain is a known liar.",
        "I forgot about the meeting because I confused 'marking it on my calendar' with 'attending it.' They're different things apparently.",
        "Sorry I missed it. I remembered we had a meeting, I just forgot the when, where, and that it was today part.",
        "I forgot about the meeting because I'm operating on a 'constant state of confusion' schedule.",
        "Sorry I wasn't there. I had it written down on a sticky note that I then immediately lost to the void.",
        "I forgot about the meeting because I'm running on the latest update: Brain OS 0.2 (Very Unstable).",
        "Sorry I missed it. I set a reminder but I've trained myself to ignore all notifications, so that backfired.",
        "I forgot about the meeting because my calendar and I are in a complicated relationship where we don't talk.",
        "Sorry I wasn't there. I remembered the meeting in the shower, which is where I remember everything I've forgotten.",
        "I forgot about the meeting because I function on a 'react to immediate panic only' basis and meetings aren't immediate until they're over.",
        "Sorry I missed it. I thought about the meeting so much that my brain marked it as 'already done.'",
        "I forgot about the meeting because my organizational system is 'write it down and hope the universe handles the rest.'",
        "Sorry I wasn't there. I exist in a perpetual state of 'what day is it' and today was not the day I guessed."
    ]
},

'work-mistake': {
    title: 'Messed up at work',
    description: 'Made an error or mistake at work',
    serious: [
        "I want to apologize for my mistake. I take full responsibility and I'm working to correct it immediately.",
        "I'm sorry for the error I made. I've identified what went wrong and I'm implementing steps to prevent this in the future.",
        "I apologize for my mistake. I should have double-checked my work before submitting it.",
        "I'm really sorry about this error. I've already begun fixing it and will have it corrected by end of day.",
        "I want to apologize for my oversight. I understand the impact this has and I'm taking steps to make it right.",
        "I'm sorry for the mistake I made. I was rushing and didn't give it the attention it deserved.",
        "I apologize for this error. I've learned from it and will be more careful going forward.",
        "I'm really sorry about my mistake. Here's my plan to fix it and ensure it doesn't happen again.",
        "I want to apologize for dropping the ball on this. I take responsibility and I'm working on a solution.",
        "I'm sorry for my error. I should have asked for clarification instead of making assumptions.",
        "I apologize for my mistake. I've reviewed what went wrong and I understand where I need to improve.",
        "I'm really sorry about this. I was dealing with multiple priorities and this one suffered as a result.",
        "I want to apologize for my oversight. I'll be implementing a new process to catch errors like this.",
        "I'm sorry for the mistake. I misunderstood the requirements and I should have confirmed before proceeding.",
        "I apologize for this error. I've notified everyone affected and I'm working on corrective action.",
        "I'm really sorry about my mistake. I was overconfident in my approach and should have been more thorough.",
        "I want to apologize for this oversight. I'll be more diligent with quality checks moving forward.",
        "I'm sorry for my error. I take ownership of this and I'm committed to doing better.",
        "I apologize for my mistake. I should have sought feedback before finalizing this work.",
        "I'm really sorry about this error. I've documented what happened so we can prevent it in the future."
    ],
    funny: [
        "I messed up at work because I was operating on the confidence of someone who knows what they're doing. I do not.",
        "Sorry for my mistake. I was running on coffee and vibes, and apparently that's not a sustainable business model.",
        "I messed up because I thought 'fake it till you make it' would carry me through. It did not carry me through.",
        "Sorry for the error. I made a bold decision with zero hesitation and maximum incorrectness.",
        "I messed up at work because I took a 'shoot first, ask questions later' approach to a task that required questions first.",
        "Sorry for my mistake. I was wildly overconfident about something I barely understood. Classic me.",
        "I messed up because I operated under the assumption that I'd figure it out as I went. I did not figure it out.",
        "Sorry for the error. I thought I was being efficient but I was actually just being wrong faster.",
        "I messed up at work because I confused 'taking initiative' with 'making chaotic decisions without supervision.'",
        "Sorry for my mistake. I was multitasking, which is code for 'doing several things poorly at once.'",
        "I messed up because I skipped the instructions and went straight to panicking. Poor strategy.",
        "Sorry for the error. I made an educated guess, but my education on this topic was lacking.",
        "I messed up at work because I said 'how hard could it be?' and the universe took that as a challenge.",
        "Sorry for my mistake. I was running on autopilot and autopilot does not know what it's doing.",
        "I messed up because I thought confidence could replace competence. Science says no.",
        "Sorry for the error. I was busy looking like I knew what I was doing instead of actually learning what to do.",
        "I messed up at work because I prioritized speed over accuracy and accuracy won the 'which matters more' debate.",
        "Sorry for my mistake. I took a shortcut that turned out to be a long cut to disaster.",
        "I messed up because I assumed I remembered how to do something I'd done once, three years ago.",
        "Sorry for the error. I was overcommitted, underprepared, and fully convinced it would all work out. It didn't."
    ]
},

'social-mistake': {
    title: 'Social mistake (awkward moment)',
    description: 'Made a social faux pas or awkward mistake',
    serious: [
        "I want to apologize for what I said earlier. I realize now that it was inappropriate and I'm truly sorry.",
        "I'm sorry for my comment. I didn't think before I spoke and I understand if I offended you.",
        "I apologize for my behavior. It was out of line and I feel terrible about it.",
        "I'm really sorry for the awkward situation I created. That wasn't my intention at all.",
        "I want to apologize for my insensitive remark. I should have been more thoughtful.",
        "I'm sorry for putting you in an uncomfortable position. I didn't realize how my words would come across.",
        "I apologize for my poor judgment. I should have read the room better.",
        "I'm really sorry if I made things weird. I wasn't thinking clearly and I regret it.",
        "I want to apologize for overstepping. I misread the situation and I'm sorry.",
        "I'm sorry for my tactless comment. I realize now how it sounded and I feel embarrassed.",
        "I apologize for bringing up something I shouldn't have. I understand if that was hurtful.",
        "I'm really sorry for my awkward behavior. I was nervous and didn't handle the situation well.",
        "I want to apologize for making you uncomfortable. That was never my intention.",
        "I'm sorry for saying something so tone-deaf. I should have been more aware.",
        "I apologize for my social misstep. I'm still learning and I appreciate your patience.",
        "I'm really sorry if I crossed a boundary. I should have been more respectful.",
        "I want to apologize for my comment. It came out wrong and I wish I could take it back.",
        "I'm sorry for creating an awkward moment. I didn't mean to make anyone feel uncomfortable.",
        "I apologize for not being more considerate. I'll be more mindful going forward.",
        "I'm really sorry about that. I realize now how inappropriate my words were."
    ],
    funny: [
        "I made a social mistake because my brain-to-mouth filter is apparently on vacation. Indefinitely.",
        "Sorry for the awkward moment. I said something and immediately wished I could travel back in time and stop myself.",
        "I made a social mistake because I operate on a 'say it first, regret it immediately' system.",
        "Sorry for being awkward. My social skills are like a browser with too many tabs open—everything's frozen.",
        "I made a social mistake because I thought the awkward thing in my head was fine to say out loud. It was not.",
        "Sorry for the weird moment. I panicked and my brain decided the worst possible response was the right one.",
        "I made a social mistake because I have the social grace of a baby giraffe learning to walk.",
        "Sorry for being awkward. I'm like social media—I should think before I post but I never do.",
        "I made a social mistake because my inner monologue became an outer monologue without my permission.",
        "Sorry for the cringe moment. I said something and my soul immediately tried to leave my body.",
        "I made a social mistake because I was nervous and nervousness makes me say things. Bad things.",
        "Sorry for being weird. I have the social awareness of someone who learned human interaction from sitcoms.",
        "I made a social mistake because I confused 'being honest' with 'saying every thought I have.'",
        "Sorry for the awkward moment. I'm still learning how to human and I failed that particular test.",
        "I made a social mistake because my brain said 'this will be funny' and my brain was extremely wrong.",
        "Sorry for being awkward. I have the social skills of a feral cat at a dinner party.",
        "I made a social mistake because I spoke before my brain could veto the words coming out of my mouth.",
        "Sorry for the cringe. I thought I was being charming but I was actually just being deeply uncomfortable.",
        "I made a social mistake because I operate on chaos energy and sometimes chaos means saying the wrong thing.",
        "Sorry for being weird. I'm basically a 'what not to do' guide in human form."
    ]
}

};

// ============================================================================
// 3. UTILITY FUNCTIONS
// ============================================================================

/**
 * Get random item from array
 */
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        return success;
    }
}

/**
 * Show toast notification
 */
function showToast(message, duration = 3000) {
    const toast = document.querySelector(SELECTORS.toast);
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/**
 * Get from local storage
 */
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (err) {
        console.error('Error reading from storage:', err);
        return null;
    }
}

/**
 * Save to local storage
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (err) {
        console.error('Error saving to storage:', err);
        return false;
    }
}

/**
 * Track analytics event
 */
function trackEvent(eventName, properties = {}) {
    // GA4 tracking (if gtag is available)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    // Console log for development
    console.log('Event:', eventName, properties);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================================================
// 4. GENERATOR FUNCTIONS
// ============================================================================

let currentExcuse = '';
let currentCategory = '';
let currentTone = 'serious';

/**
 * Generate excuse based on selected category and tone
 */
function generateExcuse() {
    const categorySelect = document.querySelector(SELECTORS.categorySelect);
    const category = categorySelect.value;
    
    if (!category) {
        showToast('Please select a situation first');
        return;
    }
    
    if (!CATEGORIES[category]) {
        showToast('Category not found');
        return;
    }
    
    const categoryData = CATEGORIES[category];
    const excuses = categoryData[currentTone];
    
    if (!excuses || excuses.length === 0) {
        showToast('No excuses available for this category');
        return;
    }
    
    currentExcuse = getRandom(excuses);
    currentCategory = category;
    
    renderResult();
    
    // Track event
    trackEvent('generator_generate', {
        category: category,
        tone: currentTone
    });
    
    // Save last used settings
    saveToStorage(STORAGE_KEYS.lastCategory, category);
    saveToStorage(STORAGE_KEYS.lastTone, currentTone);
}

/**
 * Render the result
 */
function renderResult() {
    const resultContainer = document.querySelector(SELECTORS.resultContainer);
    const resultText = document.querySelector(SELECTORS.resultText);
    const resultTone = document.querySelector(SELECTORS.resultTone);
    
    resultText.textContent = currentExcuse;
    resultTone.textContent = currentTone.charAt(0).toUpperCase() + currentTone.slice(1);
    resultContainer.style.display = 'block';
    
    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Handle tone toggle
 */
function handleToneToggle(e) {
    if (!e.target.classList.contains('tone-btn')) return;
    
    // Remove active from all buttons
    document.querySelectorAll(SELECTORS.toneButtons).forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    e.target.classList.add('active');
    
    // Update current tone
    currentTone = e.target.dataset.tone;
}

/**
 * Copy result to clipboard
 */
async function handleCopy() {
    if (!currentExcuse) return;
    
    const success = await copyToClipboard(currentExcuse);
    
    if (success) {
        showToast('Copied to clipboard!');
        trackEvent('generator_result_copy', {
            category: currentCategory,
            tone: currentTone
        });
    } else {
        showToast('Failed to copy. Please try again.');
    }
}

/**
 * Handle SMS/Text share
 */
function handleSMS() {
    if (!currentExcuse) return;
    
    const smsUrl = `sms:?body=${encodeURIComponent(currentExcuse)}`;
    window.location.href = smsUrl;
    
    trackEvent('share_click', {
        channel: 'sms',
        contentType: 'excuse'
    });
}

/**
 * Handle share
 */
async function handleShare() {
    if (!currentExcuse) return;
    
    const shareData = {
        title: 'Caught-Slippin',
        text: currentExcuse,
        url: window.location.href
    };
    
    // Check if Web Share API is available
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            trackEvent('share_click', {
                channel: 'native',
                contentType: 'excuse'
            });
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Error sharing:', err);
            }
        }
    } else {
        // Fallback: copy to clipboard
        await handleCopy();
    }
}

/**
 * Save reply to local storage
 */
function handleSaveReply() {
    if (!currentExcuse) return;
    
    const savedReplies = getFromStorage(STORAGE_KEYS.savedReplies) || [];
    
    const newReply = {
        id: Date.now(),
        text: currentExcuse,
        category: currentCategory,
        tone: currentTone,
        timestamp: new Date().toISOString()
    };
    
    savedReplies.unshift(newReply);
    
    // Keep only last 50 replies
    if (savedReplies.length > 50) {
        savedReplies.pop();
    }
    
    saveToStorage(STORAGE_KEYS.savedReplies, savedReplies);
    showToast('Reply saved!');
}

/**
 * Handle rating
 */
function handleRating(isPositive) {
    trackEvent('generator_feedback', {
        category: currentCategory,
        tone: currentTone,
        vote: isPositive ? 'up' : 'down'
    });
    
    showToast(isPositive ? 'Thanks for the feedback!' : 'Thanks, we\'ll work on improving!');
}

// ============================================================================
// 5. TIPS FUNCTIONS
// ============================================================================

/**
 * Show more tips
 */
function handleShowMoreTips() {
    const hiddenTips = document.querySelectorAll(SELECTORS.hiddenTips);
    const showMoreBtn = document.querySelector(SELECTORS.showMoreBtn);
    
    hiddenTips.forEach(tip => {
        tip.classList.remove('hidden-tip');
    });
    
    showMoreBtn.style.display = 'none';
    trackEvent('tips_show_more');
}

/**
 * Copy tip to clipboard
 */
async function handleCopyTip(e) {
    const tipCard = e.target.closest('.tip-card');
    const tipTitle = tipCard.querySelector('h3').textContent;
    const tipBody = tipCard.querySelector('p').textContent;
    const tipText = `${tipTitle}\n\n${tipBody}`;
    
    const success = await copyToClipboard(tipText);
    
    if (success) {
        showToast('Tip copied!');
        trackEvent('tip_copy', {
            tipId: tipCard.dataset.tipId
        });
    } else {
        showToast('Failed to copy. Please try again.');
    }
}

/**
 * Save tip
 */
function handleSaveTip(e) {
    const tipCard = e.target.closest('.tip-card');
    const tipId = tipCard.dataset.tipId;
    const tipTitle = tipCard.querySelector('h3').textContent;
    const tipBody = tipCard.querySelector('p').textContent;
    
    const savedTips = getFromStorage(STORAGE_KEYS.savedTips) || [];
    
    // Check if already saved
    if (savedTips.some(tip => tip.id === tipId)) {
        showToast('Tip already saved!');
        return;
    }
    
    const newTip = {
        id: tipId,
        title: tipTitle,
        body: tipBody,
        timestamp: new Date().toISOString()
    };
    
    savedTips.unshift(newTip);
    
    // Keep only last 100 tips
    if (savedTips.length > 100) {
        savedTips.pop();
    }
    
    saveToStorage(STORAGE_KEYS.savedTips, savedTips);
    showToast('Tip saved!');
    
    trackEvent('tip_save', {
        tipId: tipId
    });
}

/**
 * Rate tip
 */
function handleRateTip(e) {
    const tipCard = e.target.closest('.tip-card');
    const tipId = tipCard.dataset.tipId;
    
    trackEvent('tip_feedback', {
        tipId: tipId,
        vote: 'up'
    });
    
    showToast('Thanks for the feedback!');
    
    // Visual feedback
    e.target.style.opacity = '0.5';
    setTimeout(() => {
        e.target.style.opacity = '1';
    }, 300);
}

// ============================================================================
// 6. EVENT LISTENERS
// ============================================================================

function attachEventListeners() {
    // Generator events
    const generateBtn = document.querySelector(SELECTORS.generateBtn);
    if (generateBtn) {
        generateBtn.addEventListener('click', generateExcuse);
    }
    
    // Tone toggle
    const toneButtons = document.querySelector('.toggle-buttons');
    if (toneButtons) {
        toneButtons.addEventListener('click', handleToneToggle);
    }
    
    // Result actions
    const copyBtn = document.querySelector(SELECTORS.copyBtn);
    if (copyBtn) {
        copyBtn.addEventListener('click', handleCopy);
    }
    
    const smsBtn = document.querySelector(SELECTORS.smsBtn);
    if (smsBtn) {
        smsBtn.addEventListener('click', handleSMS);
    }
    
    const shareBtn = document.querySelector(SELECTORS.shareBtn);
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShare);
    }
    
    const saveBtn = document.querySelector(SELECTORS.saveBtn);
    if (saveBtn) {
        saveBtn.addEventListener('click', handleSaveReply);
    }
    
    const rateUpBtn = document.querySelector(SELECTORS.rateUpBtn);
    if (rateUpBtn) {
        rateUpBtn.addEventListener('click', () => handleRating(true));
    }
    
    const rateDownBtn = document.querySelector(SELECTORS.rateDownBtn);
    if (rateDownBtn) {
        rateDownBtn.addEventListener('click', () => handleRating(false));
    }
    
    // Show more tips
    const showMoreBtn = document.querySelector(SELECTORS.showMoreBtn);
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', handleShowMoreTips);
    }
    
    // Tip card actions
    document.querySelectorAll(SELECTORS.copyTipBtns).forEach(btn => {
        btn.addEventListener('click', handleCopyTip);
    });
    
    document.querySelectorAll(SELECTORS.saveTipBtns).forEach(btn => {
        btn.addEventListener('click', handleSaveTip);
    });
    
    document.querySelectorAll(SELECTORS.rateTipBtns).forEach(btn => {
        btn.addEventListener('click', handleRateTip);
    });
    
    // Category select change
    const categorySelect = document.querySelector(SELECTORS.categorySelect);
    if (categorySelect) {
        categorySelect.addEventListener('change', (e) => {
            trackEvent('category_select', {
                category: e.target.value
            });
        });
    }
    
    // Track More Tools clicks
    document.querySelectorAll('a[href*="dailyhelphub"]').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('nav_more_tools_click', {
                source: 'caught-slippin'
            });
        });
    });
}

// ============================================================================
// 7. INITIALIZATION
// ============================================================================

function init() {
    // Attach all event listeners
    attachEventListeners();
    
    // Restore last used settings
    const lastCategory = getFromStorage(STORAGE_KEYS.lastCategory);
    const lastTone = getFromStorage(STORAGE_KEYS.lastTone);
    
    if (lastCategory) {
        const categorySelect = document.querySelector(SELECTORS.categorySelect);
        if (categorySelect) {
            categorySelect.value = lastCategory;
        }
    }
    
    if (lastTone) {
        currentTone = lastTone;
        document.querySelectorAll(SELECTORS.toneButtons).forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tone === lastTone);
        });
    }
    
    // Track page view
    trackEvent('page_view', {
        page: 'home'
    });
    
    console.log('Caught-Slippin initialized successfully');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}