function getBirthday() {
    return new Date(1997, 2, 27, 0, 0, 0);
}

function getAge() {
    var date = new Date();
    var birthday = getBirthday();
    if (date.getTime() - birthday.getTime() > 1000 * 60 * 60 * 24 * 365.25) {
        return date.getFullYear() - birthday.getFullYear();
    } else {
        return date.getFullYear() - birthday.getFullYear() - 1;
    }
}

function getAccordionElements() {
    return [
        $("#programmingLanguages"),
        $("#databases"),
        $("#frameworks"),
        $("#ides"),
        $("#collapseProjectManagement"),
        $("#collapseSoftwareDevelopment"),
        $("#collapseTesting"),
        $("#collapseVersionControl"),
        $("#collapseDeepLearning"),
        $("#collapseCloud"),
        $("#collapseVisualization"),
        $("#collapseImageProcessing"),
        $("#collapseCICD"),
        $("#collapsePerformance"),
        $("#collapseArchitecture"),
        $("#collapseVirtualization"),
        $("#collapseModeling"),
        $("#collapseNetwork"),
        $("#collapseDataTransfer"),
        $("#collapseFileHosting"),
        $("#collapseCommunication"),
        $("#collapseRemoteMaintenance"),
        $("#collapseSpecification"),
        $("#collapseOfficeSolutions")
    ];
}

function accordionTextClasses() {
    return [
        ".card-body > div > h6",
        ".card-body > p",
        ".card-body"
    ]
}

function initSkillSearch() {
    var search = document.getElementById('skillSearch');

    // Apply search
    search.addEventListener('input', function () {
        var searchText = search.value.toLowerCase();
        Array.prototype.forEach.call(getAccordionElements(), function (accordion) {
            if (accordion[0].innerText.toLowerCase().indexOf(searchText) >= 0) {
                accordion.addClass("show");
                Array.prototype.forEach.call(accordionTextClasses(), function (classes) {
                    accordion.find(classes).removeHighlight().highlight(searchText);
                });
            } else {
                accordion.removeClass("show");
            }
        });
    });
}

function generateCSVSkills() {
    let skills = "";
    let delimiter = ", ";
    Array.prototype.forEach.call(getAccordionElements(), function (accordion) {
        Array.prototype.forEach.call([".card-body"], function (selector) {
            Array.prototype.forEach.call(accordion.find(selector), function (text) {
                let filteredText = text.innerText;
                filteredText = filteredText.replace(/\s+/g, " "); // trim whitespaces in between text
                filteredText = filteredText.replace(/\d+% ?/g, "\,"); // remove percentages from sliders like 90%
                // ignore / filter out explanatory texts, because they are not actual skills
                let imageProcessing = tryImageProcessing();
                for (language in imageProcessing) {
                    filteredText = filteredText.replace(imageProcessing[language].replace(/<[^>]*>?/gm, ''), "") // leave out html tags
                }
                let visualization = tryVisualization();
                for (language in visualization) {
                    filteredText = filteredText.replace(visualization[language].replace(/<[^>]*>?/gm, ''), "") // leave out html tags
                }
                let furtherSkills = getFurtherSkills();
                for (language in furtherSkills) {
                    filteredText = filteredText.replace(furtherSkills[language], "")
                }
                let relationalDatabases = getRelationalDatabases();
                for (language in relationalDatabases) {
                    filteredText = filteredText.replace(relationalDatabases[language], "");
                }
                let noSQLDatabases = getNoSQLDatabases();
                for (language in noSQLDatabases) {
                    filteredText = filteredText.replace(noSQLDatabases[language], ",")
                }
                let ormodm = getORMODM();
                for (language in ormodm) {
                    filteredText = filteredText.replace(ormodm[language], ",")
                }
                let administration = getAdministration();
                for (language in administration) {
                    filteredText = filteredText.replace(administration[language], ",")
                }

                skills += filteredText;
            });
        });
        skills += delimiter;
    });
    skills = skills.replace(/[\s]*[,]+[\s]*/gm, ", "); // use ", " as the sequence between skills
    skills = skills.trimStart();
    skills = skills.substring(0, skills.length - delimiter.length);

    return skills;
}

function showAccordion() {
    $.each(getAccordionElements(), function (index, element) {
        element.addClass("show");
    });
}

function hideAccordion() {
    $.each(getAccordionElements(), function (index, element) {
        element.removeClass("show");
    });
}

function openEmail(language) {
    let email = "ZGFuaWVsLnJ5Y2hsZXdza2kuMTk5N0BnbWFpbC5jb20=";

    if (language === 'en') {
        if (document.getElementById('formal-style').classList.contains("active")) {
            window.location.href = "mailto:"+atob(email)+"?subject=Contact%20Form%20-%20www.danielrychlewski.com&body=Dear%20Mr.%20Rychlewski,%0D%0A%0D%0A%0D%0A%0D%0AYours%20sincerely,";
        } else if (document.getElementById('informal-style').classList.contains("active")) {
            window.location.href = "mailto:"+atob(email)+"?subject=Contact%20Form%20-%20www.danielrychlewski.com&body=Hello%20Daniel,%0D%0A%0D%0A%0D%0A%0D%0AKind%20regards,";
        }
    } else if (language === 'de') {
        if (document.getElementById('formal-style').classList.contains("active")) {
            window.location.href = "mailto:"+atob(email)+"?subject=Kontaktformular%20-%20www.danielrychlewski.com&body=Sehr%20geehrter%20Herr%20Rychlewski,%0D%0A%0D%0A%0D%0A%0D%0AMit%20freundlichen%20Grüßen";
        } else if (document.getElementById('informal-style').classList.contains("active")) {
            window.location.href = "mailto:"+atob(email)+"?subject=Kontaktformular%20-%20www.danielrychlewski.com&body=Hallo%20Daniel,%0D%0A%0D%0A%0D%0A%0D%0AViele%20Grüße";
        }
    } else if (language === 'pl') {
        if (document.getElementById('formal-style').classList.contains("active")) {
            window.location.href = "mailto:"+atob(email)+"?subject=Formularz%20do%20kontaktu%20-%20www.danielrychlewski.com&body=Szanowny%20Panie%20Rychlewski,%0D%0A%0D%0A%0D%0A%0D%0AZ%20poważaniem";
        } else if (document.getElementById('informal-style').classList.contains("active")) {
            window.location.href = "mailto:"+atob(email)+"?subject=Formularz%20do%20kontaktu%20-%20www.danielrychlewski.com&body=Cześć,%20Danielu,%0D%0A%0D%0A%0D%0A%0D%0APozdrawiam";
        }
    }
}

function copySkillsToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("skills-text"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}

function tryVisualization() {
    return {
        'en': "Take a look at my <a target='_blank' href='static/pdf/DataVis1.pdf'>information visualizations</a> and my <a target='_blank' href='https://youtu.be/zQaey32rWC8'>volume visualizations</a> featuring the <a target='_blank' href='https://www.nlm.nih.gov/research/visible/visible_human.html'>Visible Human Project</a>!",
        'de': "Schauen Sie sich meine <a target='_blank' href='static/pdf/DataVis1.pdf'>Informationsvisualisierungen</a> und <a target='_blank' href='https://youtu.be/zQaey32rWC8'>Volumenvisualisierungen</a> inkl. des <a target='_blank' href='https://www.nlm.nih.gov/research/visible/visible_human.html'>Visible Human Project</a> an!",
        'pl': "Zobacz moje <a target='_blank' href='static/pdf/DataVis1.pdf'>wizualizacje informacji</a> i <a target='_blank' href='https://youtu.be/zQaey32rWC8'>woluminów</a> na przykladzie projektu <a target='_blank' href='https://www.nlm.nih.gov/research/visible/visible_human.html'>Visible Human Project</a>!"
    };
}

function tryImageProcessing() {
    return {
        'en': "Take a look at my <a target='_blank' href='static/img/Skills/Kinect.zip'>measurements</a> of objects with the Kinect 360 using plane fitting with Skanect, comparing different presets!",
        'de': "Schauen Sie sich meine <a target='_blank' href='static/img/Skills/Kinect.zip'>Messungen</a> von Objekten mit der Kinect 360 mittels Plane-Fitting mit Skanect an, in denen ich verschiedene Einstellungen vergleiche!",
        'pl': "Zobacz moje <a target='_blank' href='static/img/Skills/Kinect.zip'>pomiary</a> objektów z Kinect 360 używając plane fitting z Skanect, porównywując rózne położenia!"
    };
}

function getFurtherSkills() {
    return {
        'en': "Further skills:",
        'de': "Weitere Kenntnisse:",
        'pl': "Dalsze umiejętności:"
    };
}

function getRelationalDatabases() {
    return {
        'en': "Relational databases:",
        'de': "Relationale Datenbanken:",
        'pl': "Relacyjne bazy danych:"
    }
}

function getNoSQLDatabases() {
    return {
        'en': "NoSQL databases:",
        'de': "NoSQL-Datenbanken:",
        'pl': "NoSQLowe bazy danych:"
    }
}

function getORMODM() {
    return {
        'en': "ORM / ODM:",
        'de': "ORM / ODM:",
        'pl': "ORM / ODM:"
    }
}

function getAdministration() {
    return {
        'en': "Administration:",
        'de': "Administration:",
        'pl': "Administracja:"
    }
}

function switchLanguage(language) {
    let furtherSkills = getFurtherSkills()[language];
    let relationalDatabases = getRelationalDatabases()[language];
    let noSQLDatabases = getNoSQLDatabases()[language];
    let ormOdm = getORMODM()[language];
    let administration = getAdministration()[language];

    if (language === 'en') {
        document.getElementById("on-request-description").innerHTML = "Resume, employers' references, diplomas: available on request";
        document.getElementById("certificates-description").innerHTML = "Some of my certificates are also listed on my <a target='_blank' href='https://www.youracclaim.com/users/daniel-rychlewski/'>Acclaim</a> profile.";
        document.getElementById("about-me-description").innerHTML = "<span class='theme-color'>Software Engineer</span> in <span class='theme-color'>Zurich</span>";
        document.getElementById("service-1-description").innerHTML = "I have worked with <b>numerous tools and frameworks</b> during my career. Choosing the right ones for each requirement for the best <b>maintainability</b> of the software is a service you can take for granted.";
        document.getElementById("service-2-description").innerHTML = "<b>Quality assurance</b> has always been an integral part of my work. You can count on me implementing the right tests as part of my service to enhance the <b>comprehensibility</b> of your software.";
        document.getElementById("service-3-description").innerHTML = "Implementing MVPs and real products under <b>time pressure</b> and a fixed budget has been my bread and butter for years. Even for tight deadlines, you can expect me to always <b>deliver on time</b>.";
        document.getElementById("service-4-description").innerHTML = "I regularly integrate your <b>feedback</b> into my workflow to ensure I am well on track to tackling your requirements. That way, any room for misunderstandings quickly disappears, guaranteeing you to <b>get your money's worth</b>.";
        document.getElementById("service-5-description").innerHTML = "Keeping up with the <b>latest tech trends</b> through self-study and hands-on projects allows me to implement your vision with the highest level of quality and <b>cutting-edge design</b>, both on the surface and under the hood.";
        document.getElementById("service-6-description").innerHTML = "Being aware of the tech bubble I am operating in, I am able to <b>translate business requirements</b> into plain English and the other way around. After all, my service is supposed to <b>serve the customer</b>.";
        document.getElementById("further-programming-skills").innerHTML = "<b>"+furtherSkills+"</b> PHP, Matlab, Groovy, Shell Scripting, Chrome extension development, C, Haskell, Visual Basic, Prolog, C#, JSON/BSON, HTML, CSS";
        document.getElementById("databases-relational").innerHTML = "<b>"+relationalDatabases+"</b> MySQL, MSSQL, H2, DB2 (db2top, db2expln), MariaDB";
        document.getElementById("databases-nosql").innerHTML = "<b>"+noSQLDatabases+"</b> MongoDB";
        document.getElementById("databases-orm").innerHTML = "<b>"+ormOdm+"</b> Mongoose, Hibernate, JPA";
        document.getElementById("databases-administration").innerHTML = "<b>"+administration+"</b> NoSQLBooster, Compass, phpMyAdmin, IBM Data Studio";
        document.getElementById("skills-swe").innerHTML = "<b>"+furtherSkills+"</b> XP, waterfall model, V-Model, spiral model";
        document.getElementById("ide-skills").innerHTML = "<b>"+furtherSkills+"</b> Netbeans, <a title='C++ discrete event simulator, mainly for network simulation'>OMNeT++</a>, Matlab, BlueJ, SAP BusinessObjects";
        document.getElementById("skills-testing").innerHTML = "<b>"+furtherSkills+"</b> <a title='structure-oriented test and analysis of programs'>SOTA</a>, <a title='classification tree editor'>TESTONA</a>, <a title='automated regression testing of Java programs'>ATOSj</a>";
        document.getElementById("skills-version-control").innerHTML = "<b>"+furtherSkills+"</b> Bitbucket, TortoiseGit, RapidSVN";
        document.getElementById("skills-architecture").innerHTML = "REST APIs, microservices, client-server architecture, monolith, long polling, WebSocket";

        document.getElementById("angular-title").title = "Website development, both from the scratch and maintenance / bug fixes. For example, used for the MVP for the database replication system for hospital reconstruction, but also for a project management system.";
        document.getElementById("javascript-title").title = "My Chrome add-on 'Stop AutoLoop', which prevents YouTube video loops, is written entirely in JavaScript";
        document.getElementById("cpp-title").title = "Both at Humboldt University and during my exchange semester at Swansea University, I have learned about polymorphism, smart pointers, (variadic) templates, RAII, vTable and vPtr, move semantics, casting types, operator overloading, lambdas, threads, STL data structures and much more.";
        document.getElementById("pytorch-title").title = "This deep learning framework formed the basis of my master thesis because authors of complicated models (e.g., involving tensor splitting operations) chose PyTorch to implement their ideas with. When put together, this resulted in a variety of deep learning models to choose from in the DeepHyperX suite. My experience was that PyTorch was not well-suited for compression-related tasks such as parameter pruning since it requires tensor input and output size to be contained in the code / model, making dynamic adjustments of sizes during, e.g., channel pruning difficult (Keras would be a better choice in my opinion). Most importantly, compressed PyTorch models are not smaller than their original counterparts, counteracting one of the main motivations of model compression.";
        document.getElementById("keras-title").title = "The high-level deep learning framework built on top of TensorFlow helped me to easily set up layers and parameters of deep learning models for the classification of satellite images in my study project.";
        document.getElementById("keras-surgeon-title").title = "For my study project about the classification of satellite images with compressed convolutional neural networks, keras-surgeon offered parameter pruning based on the average percentage of zeros. That is how I could check whether or not a smaller model achieves the same classification accuracy, varying parameters like epochs, batch size, the pruning percentage and adding quantization on top. In contrast to PyTorch, the model size physically shrinks after applying pruning.";
        document.getElementById("tfjs-title").title = "My Hate Block Chrome plugin uses TensorFlow.js for client-side inference to find out whether or not a text is hateful.";
        document.getElementById("tflite-title").title = "For the mobile deployment of deep learning models into tflite files, this is the framework I have used for my master thesis.";
        document.getElementById("scikit-title").title = "SVM, SVD, k-NN and other classifiers for my master thesis about compression of neural networks for hyperspectral image classification.";
        document.getElementById("pandas-title").title = "Calculation of means, standard deviations, Excel logging for my master thesis about compression of neural networks for hyperspectral image classification.";
        document.getElementById("torch-title").title = "For my master thesis research about hyperspectral compression, I have come across models written in Lua with the Torch framework, which is a predecessor to PyTorch.";
        document.getElementById("jupyter-title").title = "Just like Jupyter Notebook is useful for data science and quick Python scripting, it has also been used for deep learning models, which I have researched for my master thesis.";
        document.getElementById("deephyperx-title").title = "DeepHyperX is the hyperspectral deep learning framework I have expanded for my master thesis by integrating fine-grained pruning, image selection and extraction as well as other models and hyperspectral datasets. For more details, please refer to my hsi-toolbox project on GitHub.";
        document.getElementById("visdom-title").title = "visdom visualized the hyperspectral datasets I dealt with for my master thesis. This included the ground truths, but also the classified datasets after the train-validation-test split.";
        document.getElementById("distiller-title").title = "Intel Distiller served as the framework for coarse-grained pruning and component-specific post-training quantization (activations, weights, accumulators) for my master thesis.";
        document.getElementById("scrum-title").title = "I have worked on numerous projects using Scrum, including its principles of daily standups, retrospectives, sprint backlog, burn-down charts etc.";
        document.getElementById("cprofile-title").title = "cProfile was integrated in PyCharm and let me discover that the card API I was initially using for a Python-based Texas hold 'em poker bot was a performance bottleneck that needed to be replaced for a faster alternative, which I did. This saved an immense amount of time for the reinforcement learning process, which allowed the simulation in the first place, because otherwise, it would have taken too long.";
        document.getElementById("jprofiler-title").title = "JProfiler helped identify bottlenecks in the CPM software I have worked on for a year, pushing it ahead of the competition.";
        document.getElementById("lineprofiler-title").title = "As the name suggests, line profiler can profile a Python program line by line, which sounded appealing to me at first for the Python-based poker bot. However, cProfile's usability was far superior and the line-based granularity not needed in my scenario, so I ended up using it instead.";
        document.getElementById("tina-title").title = "Petri net simulation software";
        document.getElementById("hets-title").title = "Analysis of CASL specifications; theorem prover";
        document.getElementById("slx-title").title = "Modeling language based on coroutines";
        document.getElementById("intellij-title").title = "My favorite IDE I have been developing numerous projects with, including the CPM finance software, the project management system and many personal projects.";
        document.getElementById("pycharm-title").title = "Used for finding strategies for the Texas hold 'em poker bot as well as connecting deep learning frameworks for my suite hsi-toolbox for my master thesis.";
        document.getElementById("webstorm-title").title = "The IDE I am using to develop this website with HTML, JS / jQuery and CSS / Bootstrap.";
        document.getElementById("android-studio-title").title = "Android development of an app for electronic identity management of doctors for hospitals and pharmacies; theoretical foundations like app lifecycle, intents, resources, permissions, content providers, externalization, graphics, maps etc.";
        document.getElementById("visual-studio-code-title").title = "My choice for Node.js/Express.js apps like the database replication system I have developed.";
        document.getElementById("xcode-title").title = "iOS development of an app for electronic identity management of doctors for hospitals and pharmacies";
        document.getElementById("azure-title").title = "As part of the Microsoft Hackathon 'Enhance your student life' in Berlin in 2019, my group has used these Azure technologies to generate flashcards based on lecture notes so that students preparing for an exam obtain the best preparation material.";
        document.getElementById("oci-title").title = "The COVID-19 pandemic was my chance to expand my cloud knowledge by viewing OCI courses that were available for free, including acquiring the OCI Foundations 2020 certificate. Among the topics are:\n"+
            "Functions: Kubernetes / Registry Service;\n"+
            "Storage: Block / File / Object / Archive Storage, Local NVMe;\n"+
            "Networking: VCN, compartment, gateways, load balancer, peering;\n"+
            "IAM: policies, SL, NSG;\n"+
            "(Autonomous) Databases: VM, BM, RAC, Exadata, ADW, ATP.";
        document.getElementById("bpmn-title").title = "Concepts and principles, as learned in my modeling course at Humboldt University.";
        document.getElementById("z-title").title = "Formal specification language I have used to model semantic requirements for classes, including mutability and value constraints of variables.";
        document.getElementById("mcrl-title").title = "Formal specification language for concurrent systems, used for determining equivalences like simulation, simulation equivalence and bisimulation for transition systems.";
        document.getElementById("casl-title").title = "Common Algebraic Specification Language";

        document.getElementById("certificate-deutschlandstipendium-description").innerHTML = "Awarded for outstanding results in the M.Sc. Computer Science, made possible by <a target=\"_blank\" href=\"https://www.picoquant.com/\">PicoQuant</a>";

        document.getElementById("onevshundred-text").innerHTML = "<p>The game show offers a competition, i.e. a form one can fill in with his personal data. After filling in the captcha and sending the form, the person participates in the contest. I want to automate this process so that a weekly scheduled task (e.g., through cron) participates automatically. In doing so, I have gotten to know the HTTP/2 client in Java 11, especially regarding asynchronous and functional programming.</p>\n" +
            "<p>To fill in the captcha, I have connected the API of anti-captcha.com, which requires the user to have a suitable API key. Personal data such as first name, last name, email address, address, zip code, location and phone number, which are required to fill in the form, can be added to Java resource files. The recording of relevant requests for the participation with Fiddler allowed me to reconstruct the request in Java.</p>\n" +
            "<p>As a result, the program allows for the contest participation at the click of a button. However, edge cases like an overloaded server, exceptions of the anti-captcha API (e.g., ConcurrentCompletionException) as well as no available workers for the captcha solving still need to be resolved, e.g., with a retry policy or by incrementally raising the money per captcha until a worker becomes available.</p>\n" +
            "<p><b>Developed with:</b> Java 11 (especially HTTP/2 builder), IntelliJ IDEA, anti-captcha.com API, Fiddler</p>";

        document.getElementById("autoloop-text").innerHTML =
        "                    <p>YouTube's autoplay feature leads to situations where a video you have already watched is played next. Such loops of <b>watching the same two videos</b> over and over again (worst case) are not necessarily desirable. This is why this browser extension can redirect the autoplay video which is supposed to be played next. This is done if it detects that the video has been watched already. The add-on supports both foreground and background tabs.</p>\n" +
        "                    <p>To be more precise, the add-on adds the URL of every YouTube video site called by the user to its <b>URL history</b>. That way, it can tell if a video has already been seen. Once a YouTube video site has been called, the site is analyzed to detect the list of <i>YouTube video recommendations</i>. These are the <b>candidates</b> among which the next video to watch is chosen. Without the add-on, the first entry of these candidates would always be chosen with the autoplay feature enabled. A YouTube video site is also scanned to detect whether or not the <b>autoplay toggle</b> is enabled at all (if not, the add-on does nothing). In addition, a video's end is also being detected by the add-on in case of <i>foreground tabs</i>. Background tabs do not have such a <b>transition process</b> to the next autoplay video, so they are redirected after a YouTube video site has been called that has already been visited.</p>\n" +
        "                    <p>The extension does feature customization options in its settings page, accessible through the icon (\"Settings\"). The user can decide if <b>playlists</b> that appear in the YouTube recommendations should be included as candidates for the next video, if the URL history should be <b>cleared</b> when a redirect occurs due to a potential loop, if the autoplay toggle shall clear the URL history and control the periodic <b>checking intervals</b> for site scanning. The settings can be reset to their default values. The icon popup also allows the user to clear the URL history manually, which will be confirmed in the add-on's background page.</p>\n" +
        "                    <p>Since v1.1, <b>blacklists and whitelists</b> are supported, the user can choose <b>which recommendation</b> of the many the add-on should select, he can display the URL history via the popup page to the extension's backup page and videos above a user-defined <b>maximum length</b> in minutes are never played. The permissions have been refined to ask for less.</p>\n" +
        "                    <p>Find out more on the <a target='_blank' href='https://github.com/daniel-rychlewski/stop-autoloop'>GitHub page</a>!</p>\n" +
        "                    <p><b>Developed with:</b> WebStorm, JavaScript, Chrome API, DOM API (especially MutationObserver)</p>\n" +
        "                    <img src=\"static/img/Projects/StopAutoloop/autoloop2.png\">";

        document.getElementById("filterlist-text").innerHTML =
        "                    <p>This repository contains a tool to generate a blacklist or whitelist for the smart TV LG 42LM670S-ZA (analyzed for the firmware 04.62.12), which can be done from the command line or with a graphical user interface. The idea is that while the Internet access of a smart TV does grant the user additional entertainment functionality, the user might want to prevent unwanted requests (e.g., for tracking purposes) to enhance his privacy. Therefore, my tool allows to generate a custom filter list based on the user's smart TV usage, which can then be imported into a router to block/allow only the specified requests.</p>\n" +
        "                    <p>To strike a balance between usability and privacy, it makes sense to block undesirable requests or only allow desired ones. To go further, I have analyzed the impact of real-time request manipulation and attempted to eavesdrop on encrypted requests in my bachelor thesis \"Information flow of a smart TV from the home network\". The results can be found in my thesis defense, where I also touched upon the meaning of the results for the bigger picture of IoT. A fine-granular analysis of the smart TV's behavior can be found in the (informal) research protocol. The documents can be found in my GitHub project.</p>\n" +
        "                    <p><b>Developed with:</b> IntelliJ GUI Designer, Java</p>\n" +
        "                    <img src=\"static/img/Projects/SmartHome/lgsmarttv.jpeg\">";

        document.getElementById("pokerbot-text").innerHTML =
            "                    <p>On the website, Texas hold 'em poker can be played using a blockchain-based currency, but there is no option to use a player with automatically chosen actions so that people could play against this bot alone and independent of time.</p>\n" +
            "                    <p>To implement such a simple Python bot, I have compared several strategies and heuristics through simulation with evolutionary algorithms (e.g., for reinforcement learning) so that relevant parameters could be adjusted. For performace enhancement, I have profiled the application and connected suitable evaluation frameworks as a result. To make the bot work on the website, a connection to the API used was necessary, which was done using WebSockets.</p>\n" +
            "                    <p>As a result, it is possible for the bot to be connected to the site without much effort so that it can play Texas hold 'em poker by itself based on the strategies which are most likely to win.</p>\n" +
            "                    <p><b>Developed with:</b> PyCharm, cProfile, line_profiler, Python, PyPokerEngine, deuces, websockets, asyncio, numpy, JSON, Bash, PuTTY(gen)</p>\n" +
            "                    <img src=\"static/img/Projects/Pokerbot/blockstamp.png\">";

        document.getElementById("hyperspectral-text").innerHTML =
            "                    <p>Neural networks have proven to be a successful instrument for image recognition because of the high accuracies they reach. However, the large model size hinders their deployment to mobile devices. Therefore, I decided to examine the compression of neural networks without causing a significant loss of accuracy for my master thesis. In addition, I consider image compression as a way of reducing the computational complexity and combine both compression types.</p>\n" +
            "                    <p>Hyperspectral images have more spectral fidelity and precision for the profiling of organisms than RGB images, which is why I chose them for the project. Nevertheless, these properties lead to a high number of dimensions, which must be reduced, e.g., with dimensionality reduction techniques. On the one hand, one can decide to reduce the number of usually hundreds of image channels according to their relevance using feature extraction oder remove irrelevant ones (feature selection). On the other hand, I investigate the usefulness of model compression by removing connections between neurons, which contribute the least to the end result (parameter pruning), and use a code book to represent the weights of these connections with fewer bits (e.g., post-training vector quantization). The purpose of this procedure is to investigate the effects of compression on multiple levels by analyzing the tradeoffs regarding parameters like memory usage, computational expense and precision and visualize the layers of the neural network to understand which parts of the image are most relevant for the activation of decisive neurons.</p>\n" +
            "                    <img src=\"static/img/Projects/MasterThesis/master1.png\"><img src=\"static/img/Projects/MasterThesis/master2.png\">\n" +
            "                    <p>It has emerged that moderate parameter pruning (depending on the model, up to 40 percent) not only does not decrease a classification accuracy, but even improves it compared to the reference, while model size, VRAM and RAM usage decline. Only at percentages higher than 40 to 50 percent does the accuracy deteriorate, which is exacerbated more and more towards the end (80 to 90 percent pruning). The number of parameters in linear layers can be reduced more than for convolutional layers without loss of accuracy. In particular, large CNN models offer considerable potential for model size reduction. Feature extraction techniques like PCA, NMF and LLE need only few image bands as components to quickly achieve a high accuracy, while feature selection acts way less predictably. A component-wise variation with post-training quantization reveals accumulators to be the most important components, followed by activations and weights of the CNN respectively, but without accuracy gain. The stated compressions can be accumulated, which leads to comparably high accuracies without as much complexity. Visualizations show that it is only at high compression rates that meaningful gradients of the CNN change significantly and with them, the accuracy. Despite the satisfying results, the currently poor tool support, especially for the hyperspectral case, is probably the most important obstacle to the usage of pruning and quantization on an industrial scale.</p>\n" +
            "                    <img src=\"static/img/Projects/MasterThesis/master5.png\"><img src=\"static/img/Projects/MasterThesis/master7.png\">\n" +
            "                    <p>This master thesis allows for less information to suffice for image recognition, which would have to be transmitted to Earth from, e.g., a satellite. At the same time, fast image classification on mobile devices becomes easier because neural networks can be represented in a more compact way, sometimes even involving accuracy improvements. The results of this work are available here: https://github.com/daniel-rychlewski/hsi-toolbox</p>\n" +
            "                    <p><b>Developed with:</b> PyTorch, DeepHyperX, Intel Distiller, Anaconda Python, Pandas, Torch (Lua), visdom, scikit-learn, JSON, PyCharm</p>";

        document.getElementById("planes-text").innerHTML =
        "                    <p>In this project, I am using compressed Convolutional Neural Networks for plane classification (two classes: plane / not plane) on RGB satellite images. This is following the observation that CNNs are well-suited for image recognition. However, they consume a lot of space, which I would like to reduce via compression. More precisely, I am applying parameter pruning and an optional vector quantization on top. In doing so, I observe how relevant parameters like memory usage and inference time have changed as well. Before applying the compressions, I am determining good base parameters for the number of epochs and the batch size.</p>\n" +
        "                    <p>Technically speaking, I have chosen a well-performing Keras model and iteratively pruned it using keras-surgeon, which considers the average-percentage-of-zeros criterion. The quantization of weights from 32-bit to 8-bit is realized through Keras' converter.</p>\n" +
        "                    <p>A small batch size meant a higher classification accuracy, but possibly more fluctuations. Parameter pruning not only reduces the size of the model, but up to 80 percent, it increases the classification accuracy. However, for added quantization, the validation accuracies have unpredictable outliers. Both model size and inference time decrease linearly with an increased pruning percentage.</p>\n" +
        "                    <img src=\"static/img/Projects/Planesnet/3_model_summary.png\">\n" +
        "                    <p><b>Developed with:</b> Keras, keras-surgeon, TensorFlow, TensorFlow-Lite, Python, Jupyter Notebook, Matplotlib, PyCharm</p>";

        document.getElementById("website-text").innerHTML =
        "                    <p>To show off my projects and market myself to potential cooperation partners, I have adjusted a template using Bootstrap 4, jQuery, HTML and CSS.</p>\n" +
        "                    <p>Internationalization and responsiveness of this single-page application have been at the heart of my agenda. For the former point, stati18n and later, JS have been used (only JS could internationalize text with included HTML tags without line breaks due to the way stati18n works). The color adjustment has been made using Koala. I made each project open in a modal window with appropriate links, descriptions and images. As for the hosting of this static site, I use GitHub Pages and Netlify.</p>\n" +
        "                    <p>As a result, I can present my skills and interests the way I want it, without having to rely on, e.g., LinkedIn's predefined structure. It makes me very glad that projects I have had the passion and chance of implementing are not forgotten or just put in form of a one-line statement on my resume due to space constraints. Recruiters can see any details of my presentation that grabs their attention, visit relevant sites on my GitHub, download measurements and try out my programs. Any details, which I am happy to provide, can be requested via the contact form. While the thought of someone finding any of my projects interesting and possibly building upon it already makes me happy, I do hope that this website shows my passion and determination for software engineering 😀</p>\n" +
        "                    <p><b>Developed with:</b> Bootstrap, HTML, CSS, JavaScript, jQuery, WebStorm, Koala, stati18n, Netlify, GitHub Pages</p>";

        document.getElementById("talentshow-text").innerHTML =
            "                    <p>The Social Evening is an event of Humboldt High School, in which both pupils and teachers can participate by registering performances they intend to present at the Social Evening.\n" +
            "                        The corresponding web interface, which was developed in the fourth semester of the advanced course of computer science during the 2013/14 school year in a group, allows for the registration of user accounts\n" +
            "                        and their verification via an activation email, the registration of performances using the respective user account as well as editing and deleting performance data inserted by oneself.</p>\n" +
            "                    <p>Administrators can set the order of the acts in a separate view. They can allow and block acts, can execute arbitrary SQL commands, set the length of the break, the date of the next Social Evening and the final date up until which acts can be registered. \n" +
            "                        Contact forms enable easy communication between the administrator and users as well as the commitment necessary for a successful planning of such an event. User-based rights management prevents actions which users are not allowed to perform.\n" +
            "                        The registration involves a password security check through JavaScript. Furthermore, a captcha must be solved after a failed login attempt.\n" +
            "                        The software can be installed using a shell script, which copies the database structure from a file and copies the files into the user-defined directory.</p>\n" +
            "                    <p><b>Developed with:</b> PHP, MySQL, CSS, HTML, JavaScript, shell scripting, phpMyAdmin, gedit</p>\n" +
            "                    <img src=\"static/img/Projects/BunterAbend/bunterabend.png\">";

        document.getElementById("pacman-text").innerHTML =
            "                    <p>In the frame of a group project in the second semester of the advanced course of computer science in the school year 2012/13, the famous Pacman game has been implemented in Java Swing using the MVC paradigm.</p>\n" +
            "                    <p>It is the player's task to collect all spheres on the field to reach the next level, in which all objects move faster than in the previous level. He can collect big spheres, which make the ghosts temporarily vulnerable, as well as the occasionally appearing fruits in the middle of the field, which additionally increase the player's score. Whenever the player loses a life, which happens when a ghost touches the Pacman, the current score is shown in the console. The game is over once all three lives are lost.</p>\n" +
            "                    <p>Unfortunately, due to copyright issues, I cannot publicly share this project here. Should you be interested in it, please contact me using the contact form.</p>\n" +
            "                    <p><b>Developed with:</b> Java Swing, SVN, BlueJ with team collaboration tools</p>\n" +
            "                    <img src=\"static/img/Projects/Pacman/pacman.png\">";

        document.getElementById("rumble-text").innerHTML =
            "<p>Pokemon Rumble Rush is a mobile game about exploring stages to catch pokemon. Unfortunately, the process of playing a stage is very repetitive, especially when it comes to gathering the rare pokemon with five-star attacks.</p>\n" +
            "<p>Thankfully, the game's controls are so basic that I could easily apply automation techniques to help out. Pokemon can be equipped with a gear, whose strength is stored in RAM. Consequently, to strengthen the gear attack, I used RAM manipulation with GameGuardian, searching for the initial CP value, changing an equipped power-up, searching again and changing the value. That way, a boss can be beaten after just one gear attack.</p>" +
            "<p>To go further, finding the right stages from a Google Docs document where stage locations are posted is difficult because of the need for precise aiming. Therefore, I used the Android accessibility options to zoom in. If necessary, Grid-Wichterle provided a grid as a reference point for tricky situations (e.g., water stage, where no other reference exists in the surrounding area). This made getting the desired stages easy.</p>\n" +
            "<p>Most importantly, the automation of beating a stage is done via QuickTouch macros. In customizable delays and repetitions of touch and slide sequences, I have specified macros for several use cases that allow the game to be played without any user input for an unlimited amount of time, as long as the battery does not run out, the phone does not overheat and the Internet connection works. Examples of use cases include beating a whole stage repeatedly with all pokemon (common, uncommon, sub-boss, boss), farming only bosses and sub-bosses, completing the daily coin rush challenge, selecting pokemon and beating bosses for a higher CP of the pokemon on an island.</p>\n" +
            "<p>As a result, pokemon can be farmed and stages and bosses beaten easily. What would have otherwise been an insanely dull and repetitive game has turned into a fun experience. Regardless, the game is due to be shut down in July 2020. For an insight into how the macros work in action, please refer to the link at the top.</p>\n" +
            "<p><b>Developed with:</b> QuickTouch - Automatic Clicker, GameGuardian, Grid-Wichterle, Android accessibility options, Google Docs, Pokemon Rumble Rush</p>\n" +
            "<img src=\"static/img/Projects/RumbleRush/stats.jpg\">";

        document.getElementById("pinboard-text").innerHTML =
            "                    <p>The implementation of an online pinboard from the first semester of the advanced course of computer science enables the registration of users for writing posts for a pinboard, whereby the most recent post is shown at the very top.</p>\n" +
            "                    <p>After they confirm their account through the activation link in the email, users are allowed to create, update and delete own posts. Moderators are allowed to approve and block posts, since users with normal permissions can only see their own posts as well as approved posts. In addition, administrators are able to manage user accounts in a management table, where they can change user data as well as delete and create user accounts. To prevent spam, the registration involves a captcha, which is also shown and needs to be solved following any failed login attempt.</p>\n" +
            "                    <p><b>Developed with:</b> PHP, MySQL, CSS, HTML, phpMyAdmin, gedit</p>\n" +
            "                    <img src=\"static/img/Projects/Pinnwand/pinnwand.png\">";

        document.getElementById("lostinspace-text").innerHTML =
        "                    <p>The minigame \"Lost in Space\" was created as a project in the computer science course in the school year 2011/12 in the 10th grade. The player has the task to navigate the rocket up and down via the arrow keys to collect stars and smileys, but avoid other objects to defeat final bosses with the laser in three different stages, varying in difficulty.</p>\n" +
        "                    <p>The difficulty is increased through a faster speed and greater number of objects coming towards the rocket, which are spawned on the right-hand side and simultaneously move to the left. Other factors are the different movement directions and speeds of the objects as well as the number of hostile lasers shot at the same time by a final boss, which the rocket must avoid, the fact that to fire an own laser, a smiley granting permission must be collected and additional shields of the final bosses. The topic of space is accentuated with adequate music and sound effects. The game is over when a hostile object hits the rocket or the player has completed all three levels.\n" +
        "                        Statistics are shown in both cases in the end, including the total score, which is calculated by the number of hostile objects avoided and stars missed.</p>\n" +
        "                    <i>How to play:</i>\n" +
        "                        <ul><li>Use the arrow keys or w/s to move up/down, hold shift to move slower, press space for the laser</li>\n" +
        "                        <li>Aim at the middle of a boss</li>\n" +
        "                        <li>Collect stars and smileys, avoid asteroids</li>\n" +
        "                        <li>Collect enough stars for bosses to appear</li>\n" +
        "                        <li>Collect smileys to be able to fire the laser again</li>\n" +
        "                        <li>Start the game using \"java -jar Lost_In_Space.jar\"</li></ul>\n" +
        "                    <p><b>Developed with:</b> Java, Greenfoot</p>\n" +
        "                    <img src=\"static/img/Projects/LostInSpace/lostinspace1.png\">\n" +
        "                    <img src=\"static/img/Projects/LostInSpace/lostinspace2.png\">" +
            "                        <p class='small'>Copyright information:\n" +
            "                        Penguin image used is by lewing@isc.tamu.edu Larry Ewing and The GIMP (https://de.wikipedia.org/wiki/Datei:NewTux.svg)<br>" +
            "                        Music: Y&V - Lune (https://www.youtube.com/watch?v=n79aphwhpW0)\n</p>";

        document.getElementById("hackathon-text").innerHTML =
            "                    <p>During the Microsoft 2019 Hackathon in Berlin under the motto of 'Enhance your student life', my team has chosen the idea of an AI-assisted learning platform for flashcard generation, which enables collaboration between students preparing for an exam.</p>\n" +
            "                    <p>To go into detail, the first step is the flashcard generation, which allows the inputs PDF / Document, Audio / Voice (using Speech to Text) and free-form input. Therefore, the tool would ideally be able to generate flashcards from lecture notes, lecture slides and large PDF lecture summaries, which students are often given.</p>\n" +
            "                    <p>Once all the cards are created, a learning session can be started. It is possible to periodically schedule such a session based on the time remaining until the exam and the desired interval frequency. In the latter case, the student gets Outlook reminders to try the questions once again when it is time to do so. The candidate sees the categories into which the flashcard questions are grouped, including specific keywords and questions the candidate got wrong/right in the past. After selecting a question, the candidate can submit an answer using free text, voice or video. Azure's AI assesses the correctness of the answer using the keywords it extracts from it. Additional information for the question and answer can be displayed using Azure Bing Search.</p>\n" +
            "                    <p>To realize a community-based approach, the user is matched up with other community members based on his score, the lecture/topic and the flash card success rate. Using this approach, not only is personalized learning made possible, but students can exchange ideas so that a talented person in one area can learn from an expert in another.</p>\n" +
            "                    <p>Technically speaking, Azure Functions was a good choice for serverless code because my team could build functions which could easily be included in the Power App. Altogether, the bare-bones app we have built in the limited timeframe of just 24 hours allowed us to outline both our technical and business concept to an audience and set the stage for further development.</p>\n" +
            "                    <p><b>Developed with:</b> Azure Cognitive Services: Text Analytics, Speech to Text, Bing Search; Azure MS SQL, Functions, C#, Blob Storage, Power Platform: PowerApps, Microsoft Flow</p>\n" +
            "                    <img src=\"static/img/Projects/Hackathon/hackathon1.jpg\">\n" +
            "                    <img src=\"static/img/Projects/Hackathon/hackathon2.jpg\">\n" +
            "                    <img src=\"static/img/Projects/Hackathon/concept.png\">";

        document.getElementById("wurzelimperium-text").innerHTML =
            "<p>Molehill Empire is a game that is based on planting, watering and harvesting fruit and vegetables in different gardens that are available to the player. To do this, he is supposed to click on each field of the 17*12-sized garden (in the standard case), although variants like the water garden exist, along with several other features of the game like guilds, contests, cactus gardens etc., which shall not be relevant for now. Obviously, this becomes tedious very fast. In addition, level progression in the game is really slow, although a premium currency called coins exists. One coin can be sold on the in-game market place for tens of thousands of in-game currency (e.g., 40,000wT). To get coins, one can choose to watch ads. However, this system of watching ads, as I have found out, is broken from the technical point of view, which opens up the perspective of implementing a proof-of-concept for generating a potentially infinite number of coins for a player, if one excludes the dangers of human intervention and account banning.</p>\n" +
            "<p>To address the need for repeated clicking, I used macros with the KraTronic recorder and ReMouse to help out, where the latter option is faster. These can be recorded or generated by my Java tool. It simplifies planting and watering the vegetables and provides a good basis for scheduling macros through cron or Windows' task scheduler. Scheduling macros on remote machines or NASes can be especially useful for events, where you are supposed to harvest and plant vegetables every 6 hours or so. This automation made the game more fun to play.</p>\n" +
            "<p>To top it all off, viewing ads allows for faster game progression, but instead of watching them on VMs, where the viewing experience is automated with macros, one can replay requests (e.g., with Fiddler) for the same effect. In essence, you need to generate a token and use it as a parameter for the ad callback, as my YouTube video shows. To make things more handy, I wrote a Java program to automate the replay of the requests, so one does not need to manually replay requests in Fiddler. This Java tool also can view ads from the drive-in cinema (an in-game event), redeem coins and complete the infinite quest series. These are quests one can fulfill only in a certain location you can drive to on Wednesdays and Saturdays in the game, but thanks to sloppy programming, I can attempt them without this location restriction every 24 hours.</p>\n" +
            "<p>Please be warned that the IntelliJ projects do not necessarily reflect any effort for clean code whatsoever, as the goal was not to create maintainable software for a client, but to get a program up and running just for me as fast as possible. As a result of my automations, a player can get ahead fast in this otherwise remarkably slow-paced game (who knows when its servers will be terminated anyway) and the game was actually fun to play because of that.</p>\n" +
            "<p><b>Developed with:</b> ReMouse Standard, Kra-Tronic Mouse and Key Recorder, Windows and Synology Task Scheduler, Fiddler, Wireshark, Java 8 (HttpURLConnection, Streams, IO)</p>";

        document.getElementById("hateblock-text").innerHTML =
            "<p>Do you want to find out if a text fragment you see on a website in your Chrome webbrowser is offensive in any way? This extension features a deep learning model running on your computer that can confirm or refute your gut feeling about a text being (severely) toxic, a threat, sexually explicit, obscene, an insult or an identity attack. That way, you can check if it is just your opinion or if the text is actually hateful. Apart from that, the purpose of this app is to experiment with Tensorflow.js so that every user can see what an in-built deep learning model based on a Universal Sentence Encoder is capable of doing without needing to understand anything about AI. The classification works for English only and considers the seven categories mentioned above.</p>\n" +
            "<p>How it works: Right-click on any text selection and choose \"Analyze for hate\". This will trigger the inference of the model, which is the text toxicity detection example available for TensorFlow.js. After the inference finishes (might take up to a few seconds), the text is highlighted with a color, depending on whether the hate type or the lack thereof has been detected or the result has been inconclusive. Hover over the marked text to find out which of the seven categories have been detected, one of which is used for the purpose of color highlighting. The user can customize which of the seven criteria the model should use for analysis in the popup menu of the addon. Just click on the icon of the extension, choose the desired option from the dropdown menu and save your changes using the save button. This is where one can also customize the three colors used for highlighting.</p>\n" +
            "<p>Find out more on the <a target='_blank' href='https://github.com/daniel-rychlewski/hateblock'>GitHub page</a>!</p>\n" +
            "<p><b>Developed with:</b> TensorFlow.js, WebStorm, JavaScript, Chrome API (pop-up page and context menu), DOM API</p>\n" +
            "<img src=\"static/img/Projects/HateBlock/hateblock1.png\">\n" +
            "<img src=\"static/img/Projects/HateBlock/hateblock2.png\">";

        document.getElementById("start-description-1").innerHTML = "I am a software engineer with experience on various full-stack projects.";
        document.getElementById("start-description-2").innerHTML = "If you find anything on this site which sounds interesting to you, please do feel free to <a href=\"#contact\">contact me</a>! I am always excited about opportunities and look forward to working with you.";
        document.getElementById("start-description-3").innerHTML = "The <a href=\"#work\">projects</a> you will find on this website are all done by myself.";

        document.getElementById("role-1").innerHTML = "Full-Stack Software Engineer";
        document.getElementById("role-2").innerHTML = "Backend Developer";

        document.getElementById("onevshundred-heading").innerHTML = "1 vs. 100";
        document.getElementById("onevshundred-subtitle").innerHTML = "Contest participation tool";
        document.getElementById("autoloop-heading").innerHTML = "Stop AutoLoop";
        document.getElementById("autoloop-subtitle").innerHTML = "Stop autoplaying the same videos";
        document.getElementById("filterlist-heading").innerHTML = "Filter List Generation Tool";
        document.getElementById("filterlist-subtitle").innerHTML = "Privacy vs. usability of smart TVs";
        document.getElementById("pokerbot-heading").innerHTML = "Texas Hold 'em Bot";
        document.getElementById("pokerbot-subtitle").innerHTML = "Play poker against a challenging AI";
        document.getElementById("hyperspectral-heading").innerHTML = "Hyperspectral Classification with Compressed CNNs";
        document.getElementById("hyperspectral-subtitle").innerHTML = "Reduced image and model dimensionalities";
        document.getElementById("planes-heading").innerHTML = "Plane Recognition in Satellite Images with Compressed CNNs";
        document.getElementById("planes-subtitle").innerHTML = "Picture copyright: CC-BY-SA rhammell https://www.kaggle.com/rhammell/planesnet";
        document.getElementById("website-heading").innerHTML = "www.danielrychlewski.com";
        document.getElementById("website-subtitle").innerHTML = "My own website";
        document.getElementById("talentshow-heading").innerHTML = "Talent Show Management";
        document.getElementById("talentshow-subtitle").innerHTML = "Register and plan acts online";
        document.getElementById("pacman-heading").innerHTML = "Pacman in Java";
        document.getElementById("pacman-subtitle").innerHTML = "MVC implementation of the game";
        document.getElementById("rumble-rush-heading").innerHTML = "Pokemon Rumble Rush";
        document.getElementById("rumble-rush-subtitle").innerHTML = "Mobile game automation with macros";
        document.getElementById("pinboard-heading").innerHTML = "Online Pinboard";
        document.getElementById("pinboard-subtitle").innerHTML = "CRUD app with RBAC controls";
        document.getElementById("lostinspace-heading").innerHTML = "Lost in Space";
        document.getElementById("lostinspace-subtitle").innerHTML = "Explore the space with your rocket!";

        document.getElementById("onevshundred-modal-heading").innerHTML = "1 vs. 100";
        document.getElementById("autoloop-modal-heading").innerHTML = "Stop AutoLoop";
        document.getElementById("filterlist-modal-heading").innerHTML = "LG 42LM670S-ZA filter list generation tool";
        document.getElementById("pokerbot-modal-heading").innerHTML = "Texas hold 'em Bot";
        document.getElementById("pokerbot-modal-play").innerHTML = "Play now!";
        document.getElementById("hyperspectral-modal-heading").innerHTML = "Hyperspectral Image Classification of Satellite Images Using Compressed Neural Networks";
        document.getElementById("planes-modal-heading").innerHTML = "Analysis of the model compression techniques \"parameter pruning\" and \"vector quantization\" for Convolutional Neural Networks for the example of satellite images";
        document.getElementById("planes-modal-download").innerHTML = "Download my measurements";
        document.getElementById("planes-modal-github").innerHTML = "View on GitHub";
        document.getElementById("wurzelimperium-modal-github").innerHTML = "View on GitHub";
        document.getElementById("website-modal-heading").innerHTML = "My Website";
        document.getElementById("talentshow-modal-heading").innerHTML = "Talent Show Management";
        document.getElementById("pacman-modal-heading").innerHTML = "Pacman in Java";
        document.getElementById("rumble-modal-heading").innerHTML = "Pokemon Rumble Rush";
        document.getElementById("rumble-modal-download").innerHTML = "Download screenshots";
        document.getElementById("rumble-modal-see").innerHTML = "Demo videos";
        document.getElementById("wurzelimperium-modal-see").innerHTML = "Demo videos";
        document.getElementById("pinboard-modal-heading").innerHTML = "Online Pinboard";
        document.getElementById("lostinspace-modal-heading").innerHTML = "Lost in Space";
        document.getElementById("lostinspace-modal-playdownload").innerHTML = "Download and play now!";
        document.getElementById("skills-modal-heading").innerHTML = "Skills";
        document.getElementById("wurzelimperium-heading").innerHTML = "Molehill Empire";
        document.getElementById("wurzelimperium-subtitle").innerHTML = "Macro automation and task scheduling";
        document.getElementById("wurzelimperium-modal-heading").innerHTML = "Molehill Empire";
        document.getElementById("hateblock-heading").innerHTML = "Hate Block";
        document.getElementById("hateblock-subtitle").innerHTML = "Client-side hate detection with a Universal Sentence Encoder";
        document.getElementById("hateblock-modal-heading").innerHTML = "Hate Block";

        let close = "Close";
        document.getElementById("skills-close").innerHTML = close;
        document.getElementById("onevshundred-close").innerHTML = close;
        document.getElementById("autoloop-close").innerHTML = close;
        document.getElementById("filterlist-close").innerHTML = close;
        document.getElementById("pokerbot-close").innerHTML = close;
        document.getElementById("hyperspectral-close").innerHTML = close;
        document.getElementById("planes-close").innerHTML = close;
        document.getElementById("website-close").innerHTML = close;
        document.getElementById("talentshow-close").innerHTML = close;
        document.getElementById("pacman-close").innerHTML = close;
        document.getElementById("rumble-close").innerHTML = close;
        document.getElementById("pinboard-close").innerHTML = close;
        document.getElementById("lostinspace-close").innerHTML = close;
        document.getElementById("hackathon-close").innerHTML = close;
        document.getElementById("imprint-close").innerHTML = close;
        document.getElementById("privacy-close").innerHTML = close;
        document.getElementById("wurzelimperium-close").innerHTML = close;
        document.getElementById("hateblock-close").innerHTML = close;

        document.getElementById("imprint-link").innerHTML = "Legal Notice (German)";
        document.getElementById("privacy-link").innerHTML = "Privacy (German)";
        document.getElementById("privacy-heading").innerHTML = "Privacy Policy";

        document.getElementById("skillSearch").placeholder = "Search for a skill here";

        document.getElementById("hackathon-modal-heading").innerHTML = "Flashcard generation for exam preparation";
        document.getElementById("hackathon-heading").innerHTML = "Microsoft Hackathon 2019";
        document.getElementById("hackathon-subtitle").innerHTML = "Enhance Your Student Life";

    } else if (language === 'de') {
        document.getElementById("on-request-description").innerHTML = "Lebenslauf, Arbeitszeugnisse, Universitätsdiplome: auf Anfrage";
        document.getElementById("hackathon-modal-heading").innerHTML = "Karteikarten-Generator zur Prüfungsvorbereitung";
        document.getElementById("hackathon-heading").innerHTML = "Microsoft Hackathon 2019";
        document.getElementById("hackathon-subtitle").innerHTML = "Enhance Your Student Life";

        document.getElementById("hackathon-text").innerHTML =
            "                    <p>Im Rahmen des Microsoft 2019 Hackathons in Berlin unter dem Motto 'Enhance your student life' hat sich mein Team dazu entschlossen, die Idee einer KI-basierten Lernplattform zum Generieren von Karteikarten zu realisieren, die die Zusammenarbeit zwischen Studenten ermöglicht, die sich für eine Prüfung vorbereiten.</p>\n" +
            "                    <p>Im Detail betrachtet, besteht der erste Schritt im Generieren von Karteikarten. Dazu werden als Input die Formate PDF / Dokumente, Audio / Stimme (mit Speech to Text) sowie eine Freitexteingabe ermöglicht. Daher ist das Tool idealerweise in der Lage, Karteikarten zu generieren aus Vorlesungsmitschriften, -folien und -skripten, über die die Studenten oftmals verfügen.</p>\n" +
            "                    <p>Sobald alle Karten erstellt sind, wird eine Lerneinheit gestartet. Es ist möglich, eine solche Session basierend auf der verbleibenden Zeit zur Prüfung und der gewünschten Intervallfrequenz periodisch zu planen. Im letzteren Fall bekommt der Student Outlook-Erinnerungen, die Fragen zur gegebenen Zeit erneut zu versuchen. Der Kandidat sieht die Kategorien, in die die Karteikarten gruppiert werden, inklusive spezifischer Schlüsselwörter und Fragen, die der Kandidat in der Vergangenheit falsch/richtig beantwortet hat. Nach der Auswahl einer Frage kann der Kandidat eine Antwort angeben, was er mittels eines Freitextfeldes, durch die Stimme oder ein Video durchführen kann. Die Azure-KI bewertet die Korrektheit der Antworten durch extrahierte Schlüsselwörter. Zusatzinformationen für die Frage und Antwort können mit der Azure Bing-Suche eingeblendet werden.</p>\n" +
            "                    <p>Um einen community-basierten Ansatz zu realisieren, wird der Nutzer mit anderen Mitgliedern der Community vernetzt, was auf Basis von Punktzahl, Vorlesung/Thema und der Erfolgsrate für die Karteikarte geschieht. Mit diesem Vorgehen wird nicht nur personalisiertes Lernen ermöglicht, sondern Studenten können sich auch über Ideen austauschen, sodass eine talentierte Person in einem Themenfeld von einem Experten in einem anderen Thema lernen kann.</p>\n" +
            "                    <p>Aus technischer Sicht war Azure Functions eine gute Wahl für den serverlosen Code, da mein Team Funktionen konstruieren konnte, die in die Power-App leicht integriert werden konnten. Zusammengefasst hat unsere Grundstruktur der App, die wir in dem sehr begrenzten Zeitraum von 24 Stunden gebaut haben, ermöglicht, dass wir sowohl die technische als auch die Business-Vision einem Publikum vorstellen konnten. Sie hat den ersten Stein für die Weiterentwicklung der Idee gelegt.</p>\n" +
            "                    <p><b>Entwickelt mit:</b> Azure Cognitive Services: Text-Analytics, Speech-to-Text, Bing-Suche; Azure MS SQL, Functions, C#, Blob Storage, Power Platform: PowerApps, Microsoft Flow</p>\n" +
            "                    <img src=\"static/img/Projects/Hackathon/hackathon1.jpg\">\n" +
            "                    <img src=\"static/img/Projects/Hackathon/hackathon2.jpg\">\n" +
            "                    <img src=\"static/img/Projects/Hackathon/concept.png\">";

        document.getElementById("imprint-link").innerHTML = "Impressum";

        document.getElementById("certificates-description").innerHTML = "Einige Zertifikate sind auch auf meinem <a target='_blank' href='https://www.youracclaim.com/users/daniel-rychlewski/'>Acclaim</a>-Profil zu finden.";
        document.getElementById("about-me-description").innerHTML = "<span class='theme-color'>Software-Ingenieur</span> in <span class='theme-color'>Zürich</span>";
        document.getElementById("service-1-description").innerHTML = "In meiner beruflichen Laufbahn habe ich mit <b>verschiedenen Tools und Frameworks</b> gearbeitet. Sie können sich darauf verlassen, dass ich für jede Aufgabe die passenden Werkzeuge als Grundlage wähle, um die Software so <b>leicht wartbar</b> wie möglich zu machen.";
        document.getElementById("service-2-description").innerHTML = "<b>Qualitätssicherung</b> sowie Liebe zum Detail gehören zu meiner Kernaufgabe. Ich werde für eine Abdeckung der Software durch sinnvolle Tests sorgen, um deren gewünschte Funktionalität auf eine <b>nachvollziehbare Art</b> zu untermauern.";
        document.getElementById("service-3-description").innerHTML = "Die Implementierung von MVPs und produktiv eingesetzter Software unter <b>zeitlichem Druck</b> und begrenztem Budget ist für mich jahrelang alltägliche Arbeit gewesen. Daher können Sie sich darauf verlassen, dass ich <b>zeitliche Vorgaben einhalten</b> werde.";
        document.getElementById("service-4-description").innerHTML = "Ich baue Ihr <b>Feedback</b> in meinen Arbeitsablauf ein, um sicherzustellen, dass wir nicht aneinander vorbeireden. Somit wird der Spielraum für Missverständnisse minimiert und Ihr Geld <b>nur für das verwendet, wofür es verwendet werden soll</b>.";
        document.getElementById("service-5-description").innerHTML = "Den <b>neuesten technischen Trends</b> durch Weiterbildung und eigene Projekte nachzukommen, erlaubt es mir, Ihre Vision mit dem größten Qualitätsanspruch umzusetzen und ein sowohl aus visueller als auch aus architektonischer Perspektive <b>hochmodernes Design</b> einzusetzen.";
        document.getElementById("service-6-description").innerHTML = "Zwar erkenne ich komplexe technische Zusammenhänge, doch ich kann sie auf eine nicht-technische, <b>verständliche Weise</b> erklären. Umgekehrt bin ich auch in der Lage, Produktanforderungen technisch zu interpretieren, um potentielle Probleme <b>frühestmöglich zu erkennen</b>.";
        document.getElementById("further-programming-skills").innerHTML = "<b>"+furtherSkills+"</b> PHP, Matlab, Groovy, Shell-Programmierung, Programmierung von Chrome-Erweiterungen, C, Haskell, Visual Basic, Prolog, C#, JSON/BSON, HTML, CSS";
        document.getElementById("databases-relational").innerHTML = "<b>"+relationalDatabases+"</b> MySQL, MSSQL, H2, DB2 (db2top, db2expln), MariaDB";
        document.getElementById("databases-nosql").innerHTML = "<b>"+noSQLDatabases+"</b> MongoDB";
        document.getElementById("databases-orm").innerHTML = "<b>"+ormOdm+"</b> Mongoose, Hibernate, JPA";
        document.getElementById("databases-administration").innerHTML = "<b>"+administration+"</b> NoSQLBooster, Compass, phpMyAdmin, IBM Data Studio";
        document.getElementById("skills-swe").innerHTML = "<b>"+furtherSkills+"</b> XP, Wasserfallmodell, V-Modell, Spiralmodell";
        document.getElementById("ide-skills").innerHTML = "<b>"+furtherSkills+"</b> Netbeans, <a title='C++-Simulator für diskrete Ereignisse, hauptsächlich für Netzwerksimulationen'>OMNeT++</a>, Matlab, BlueJ, SAP BusinessObjects";
        document.getElementById("skills-testing").innerHTML = "<b>"+furtherSkills+"</b> <a title='strukturorientierter Test und Analyse von Programmen'>SOTA</a>, <a title='Bearbeitung von Klassifikationsbäumen'>TESTONA</a>, <a title='automatisierter Regressionstest von Java-Programmen'>ATOSj</a>";
        document.getElementById("skills-version-control").innerHTML = "<b>"+furtherSkills+"</b> Bitbucket, TortoiseGit, RapidSVN";
        document.getElementById("skills-architecture").innerHTML = "REST-Schnittstellen, Microservice, Client-Server, Monolith, Long Polling, WebSocket";

        document.getElementById("angular-title").title = "Entwicklung von Webseiten, sowohl von Grund auf als auch die Wartung bestehender Seiten / Bugfixes. Habe ich z.B. verwendet beim MVP für das Datenbankreplikationssystem zum Spitalneubau, aber auch für das Projektmanagementsystem.";
        document.getElementById("javascript-title").title = "Mein Chrome-Addon 'Stop AutoLoop', welches YouTube Videoschleifen verhindert, ist in JavaScript geschrieben.";
        document.getElementById("cpp-title").title = "An der Humboldt-Universität sowie der Swansea University während meines Austauschsemesters habe ich Konzepte wie Polymorphismus, Smart Pointer, variadic templates, RAII, vTable und vPtr, Move-Semantik, Casting-Typen, operator overloading, Lambdas, Threads, STL-Datenstrukturen und mehr kennengelernt."
        document.getElementById("pytorch-title").title = "Dieses Deep-Learning-Framework stellte die Grundlage meiner Masterarbeit dar, da Autoren komplizierter Modelle (z.B. mit Tensor-Splitting-Operationen) PyTorch zur Implementierung ihrer Ideen verwendet haben. Zusammengefasst ergibt sich eine Vielzahl an Deep-Learning-Modellen im DeepHyperX-Framework. Meiner Erfahrung nach ist PyTorch nicht gut geeignet zur Kompression z.B. mittels parameter pruning, da es erfordert, dass Tensorgrößen für den Input und Output im Code / Modell enthalten sind, was dynamische Anpassungen durch z.B. channel pruning erschwert (Keras wäre meines Erachtens eine bessere Wahl dafür). Insbesondere sind komprimierte PyTorch-Modelldateien nicht kleiner als deren jeweiliges Original, was einen Vorteil der Modellkompression zunichte macht.";
        document.getElementById("keras-title").title = "Dieses auf TensorFlow aufgebaute Deep-Learning-Framework hat mir geholfen, Layer und Parameter von Deep-Learning-Modellen für die Klassifizierung von Satellitenbildern in meinem Studienprojekt einfach zu erstellen.";
        document.getElementById("keras-surgeon-title").title = "Für mein Studienprojekt über die Klassifizierung von Satellitenbildern mit komprimierten neuronalen Netzen bot keras-surgeon die Möglichkeit von parameter pruning an, basierend auf der Metrik 'average-percentage-of-zeros'. Somit konnte ich prüfen, ob ein kleineres Modell die gleiche Klassifikationsgenauigkeit erreicht, während ich Parameter wie Epochs, Batch Size und die Pruning-Prozentzahl variierte sowie Quantisierung zusätzlich durchgeführt habe. Im Gegensatz zu PyTorch wird das Modell nach einer Kompression durch parameter pruning physisch kleiner.";
        document.getElementById("tfjs-title").title = "Mein Hate Block Chrome-Plugin nutzt TensorFlow.js zur clientseitigen Inferenz zum Herausfinden, ob ein Text hasserfüllt ist.";
        document.getElementById("tflite-title").title = "Dies ist das Framework zum mobilen Deployment von Deep-Learning-Modellen in tflite-Dateien für meine Masterarbeit.";
        document.getElementById("scikit-title").title = "SVM, SVD, k-NN und andere Klassifizierer für meine Masterarbeit über Kompression neuronaler Netzwerke zur hyperspektralen Bildklassifizierung.";
        document.getElementById("pandas-title").title = "Zur Berechnung von Durchschnitten, Standardabweichungen und einem Excel-Logging für meine Masterarbeit über Kompression neuronaler Netzwerke zur hyperspektralen Bildklassifizierung.";
        document.getElementById("torch-title").title = "Zur Recherche für meine Masterarbeit über hyperspektrale Kompression bin ich Modellen über den Weg gelaufen, die in der Sprache Lua mit dem Torch-Framework programmiert worden sind, was ein Vorläufer von PyTorch ist.";
        document.getElementById("jupyter-title").title = "So wie Jupyter Notebook nützlich für Data Science und schnelles Python-Skripting ist, wurde es auch für viele Deep-Learning-Modelle verewndet, die ich für meine Masterarbeit recherchiert habe.";
        document.getElementById("deephyperx-title").title = "DeepHyperX ist das hyperspektrale Deep-Learning-Framework, das ich für meine Masterarbeit erweitert habe, indem ich feingranulares Pruning, image selection und image extraction sowie andere Modelle und hyperspektrale Datensets integriert habe. Für weitere Details, bitte rufen Sie mein hsi-toolbox-Projekt auf GitHub auf.";
        document.getElementById("visdom-title").title = "visdom visualisierte die hyperspektralen Datensets für meine Masterarbeit. Dies beinhaltete die Ground Truths, aber auch die klassifizierten Datensets nach dem Split in Training, Validierung und Test.";
        document.getElementById("distiller-title").title = "Intel Distiller diente als Framework zum grobgranularem Pruning und zur komponentenspezifischen Quantisierung (Aktivierungen, Gewichte, Akkumulatoren) für meine Masterarbeit.";
        document.getElementById("scrum-title").title = "Ich habe an verschiedenen Projekten mit Scrum gearbeitet, insbesondere mit Prinzipien wie Daily Standups, Retrospektiven, Sprint Backlog, Burndown-Charts usw.";
        document.getElementById("cprofile-title").title = "cProfile war in PyCharm integriert und erlaubte mir festzustellen, dass die API für die Karten, die ich ursprünglich für den Texas Hold'em-Bot verwendet habe, ein Performance-Bottleneck war, welches ich durch den Einsatz einer schnelleren Alternative beseitigt habe. Dies hat sehr viel Zeit für das Reinforcement Learning gespart, was eine Simulation überhaupt erst ermöglicht hat. Ansonsten hätte die Simulation zu lange gedauert.";
        document.getElementById("jprofiler-title").title = "JProfiler half mir, Bottlenecks in der CPM-Software zu entdecken, an der ich ein Jahr lang gearbeitet habe, was einen Vorsprung gegenüber der Konkurrenz verschafft hat.";
        document.getElementById("lineprofiler-title").title = "Wie der Name sagt, kann line profiler ein Python-Programm Zeile für Zeile profilen, was für mich bzgl. meines Python-basierten Poker-Bots zunächst verlockend klang. Jedoch war die Nutzbarkeit von cProfile deutlich überlegen und die zeilenbasierte Granularität in meinem Szenario nicht nötig, sodass ich dies stattdessen verwendet habe.";
        document.getElementById("tina-title").title = "Software zur Simulation von Petrinetzen";
        document.getElementById("hets-title").title = "Analyse von CASL-Spezifikationen; Theorembeweiser";
        document.getElementById("slx-title").title = "Modellierungssprache auf Basis von Koroutinen";
        document.getElementById("intellij-title").title = "Mein IDE der Wahl für verschiedene Projekte, u.a. eine CPM-Software, ein Projektmanagementsystem und viele eigene Projekte.";
        document.getElementById("pycharm-title").title = "Zur Strategienfindung für den Texas Hold'em-Bot verwendet sowie zum Anbinden von Deep-Learning-Frameworks an meine Suite 'hsi-toolbox' zur Masterarbeit.";
        document.getElementById("webstorm-title").title = "Das IDE, mit dem ich diese Webseite mit HTML, JS / jQuery und CSS / Bootstrap entwickle.";
        document.getElementById("android-studio-title").title = "Android-Entwicklung einer App zum elektronischen Identitätsmanagement von Ärzten in Spitälern und Apotheken; theoretische Grundlagen wie der App-Lifecycle, Intents, Resourcen, Berechtigungen, Content-Provider, Externalisierung, Grafiken, Maps etc.";
        document.getElementById("visual-studio-code-title").title = "Meine Wahl für Node.js/Express.js-Applikationen wie das Datenbankreplikationssystem, das ich entwickelt habe.";
        document.getElementById("xcode-title").title = "iOS-Entwicklung einer App zum elektronischen Identitätsmanagement von Ärzten in Spitälern und Apotheken.";
        document.getElementById("azure-title").title = "Als Teil des Microsoft Hackathons 'Enhance your student life' 2019 in Berlin hat meine Gruppe diese Technologien verwendet, um Karteikarten auf Basis von Notizen zu Vorlesungen zu generieren, sodass Studenten das beste Lernmaterial für die Prüfungsvorbereitung erhalten.";
        document.getElementById("oci-title").title = "Die COVID-19-Pandemie war meine Chance, das Cloud-Wissen durch OCI-Kurse zu erweitern, die für einen kurzen Zeitraum umsonst waren, zu erweitern. Insbesondere konnte ich die Prüfung zum OCI Foundations 2020-Zertifikat erfolgreich und kostenlos ablegen. Die Themen sind:\n"+
            "Functions: Kubernetes / Registry-Service;\n"+
            "Storage: Block / File / Object / Archive-Storage, lokaler NVMe;\n"+
            "Networking: VCN, Compartment, Gateways, Load Balancer, Peering;\n"+
            "IAM: Policies, SL, NSG;\n"+
            "(Autonomous) Databases: VM, BM, RAC, Exadata, ADW, ATP.";
        document.getElementById("bpmn-title").title = "Konzepte und Prinzipien, wie ich sie in einem Modellierungskurs an der Humboldt-Universität gelernt habe.";
        document.getElementById("z-title").title = "Formale Spezifikationssprache, die ich benutzt habe, um semantische Zusammenhänge für Klassen zu modellieren. Dies beinhaltet v.a. Bedingungen zur Veränderbarkeit sowie Werte, die Variablen annehmen dürfen.";
        document.getElementById("mcrl-title").title = "Formale Spezifikationssprache für nebenläufige Systeme. Ich habe sie verwendet zum Herausfinden von Äquivalenzen wie Simulation, Simulationsäquivalenz und Bisimulation für Transitionssysteme.";
        document.getElementById("casl-title").title = "Common Algebraic Specification Language";

        document.getElementById("certificate-deutschlandstipendium-description").innerHTML = "Verliehen für herausragende Leistungen im Studiengang Informatik (M.Sc.), ermöglicht durch <a target=\"_blank\" href=\"https://www.picoquant.com/\">PicoQuant</a>";

        document.getElementById("onevshundred-text").innerHTML =
            "<p>Die Spielshow bietet einen Zuschauerwettbewerb an, d.h. ein Formular, in dem man seine persönlichen Daten eintragen kann. Nach dem Abschicken des Formulars, welches ein Captcha beinhaltet, nimmt man am Gewinnspiel teil. Dies will ich automatisieren, damit man bestenfalls mittels der Aufgabenplanung oder eines Cron-Jobs wöchentlich automatisch teilnehmen kann. Dabei lernte ich den HTTP/2-Client in Java 11 kennen, v.a. im Hinblick auf Asynchronität und funktionale Programmierung.</p>\n" +
            "<p>Zum Ausfüllen des Captchas habe ich die API von anti-captcha.com angebunden, für die der Nutzer einen passenden API-Key haben muss. Persönliche Daten wie Vorname, Nachname, E-Mail-Adresse, Adresse, PLZ, Ort und Telefonnummer, die für das Ausfüllen des Formulars verwendet werden sollen, können in Dateien hinterlegt werden, die von Java als Resourcen betrachtet werden. Die Aufzeichnung relevanter Requests bei der Teilnehme mit Fiddler ermöglichte mir, den passenden Request in Java nachzubauen.</p>\n" +
            "<p>Im Ergebnis ermöglicht ein Programm auf Knopfdruck die Teilnahme am Gewinnspiel. Jedoch müssen Fehlerfälle wie ein überlasteter Server, Exceptions der anti-captcha-API (z.B. ConcurrentCompletionException) sowie keine verfügbare worker zur Lösung des Captchas angegangen werden (z.B. mit einer Retry-Policy oder dem Heraufsetzen des Geldbetrages pro Captcha für mehr verfügbare worker).</p>\n" +
            "<p><b>Entwickelt mit:</b> Java 11 (insbesondere HTTP/2-Builder), IntelliJ IDEA, anti-captcha.com-API, Fiddler</p>";

        document.getElementById("autoloop-text").innerHTML =
            "                    <p>YouTubes Autoplay-Feature führt zu Situationen, in denen ein Video, das man bereits gesehen hat, als Nächstes abgespielt wird. Solche Schleifen, in denen man <b>dieselben zwei Videos</b> immer wieder abgespielt werden (worst case) sind nicht wünschenswert. Daher kann diese Browser-Erweiterung das Autoplay-Video umleiten, das als Nächstes gespielt werden soll. Das passiert, wenn es erkennt, dass das Video bereits geschaut worden ist. Das Add-on unterstützt Tabs sowohl im Vordergrund als auch im Hintergrund.</p>\n" +
            "                    <p>Genauer gesagt fügt das Add-on die URL jeder YouTube Video-Seite, die der Nutzer aufruft, zur <b>URL-History</b> hinzu. Dadurch kann es beurteilen, ob ein Video bereits gesehen worden ist. Sobald eine YouTube Video-Seite aufgerufen wird, wird die Seite analysiert, um die Liste an <i>YouTube-Videoempfehlungen</i> zu entdecken. Dies sind die <b>Kandidaten</b>, aus denen das nächste Video gewählt wird. Ohne das Add-on würde bei aktiviertem Autoplay-Feature stets der erste Eintrag dieser Kandidaten gewählt werden. Eine YouTube Video-Seite wird auch analysiert, um festzustellen, ob der <b>Autoplay-Button</b> überhaupt aktiviert ist (ansonsten tut das Add-on nichts). Außerdem wird im Falle von <i>Tabs im Vordergrund</i> das Ende eines Videos durch das Add-on festgestellt. Tabs im Hintergrund gehen keinen solchen <b>Übergangsprozess</b> zum nächsten Autoplay-Video durch, sodass sie weitergeleitet werden, nachdem eine bereits gesehene YouTube Video-Seite aufgerufen worden ist.</p>\n" +
            "                    <p>Die Erweiterung lässt sich auf der Einstellungsseite vielfältig anpassen, die durch das Icon aufgerufen werden kann (\"Settings\"). Der Nutzer kann entscheiden, ob <b>Playlists</b>, die in den YouTube-Empfehlungen auftauchen, als Kandidaten für das nächste Video in Betracht gezogen werden sollen, ob die URL-History <b>gelöscht</b> werden soll, wenn eine Umleitung aufgrund einer potentiellen Schleife auftritt, ob der Autoplay-Button die URL-History löschen soll und kann die periodischen <b>Prüfungsintervalle</b> zur Analyse der Seite einstellen. Die Einstellungen können auf ihre ursprünglichen Werte zurückgesetzt werden. Das Icon-Popup erlaubt dem Nutzer ebenfalls, die URL-History manuell zu löschen, was in der Hintergrundseite des Add-ons bestätigt wird.</p>\n" +
            "                    <p>Seit v1.1 werden <b>Blacklists und Whitelists</b> unterstützt, der Nutzer kann auswählen, <b>welche der Videoempfehlungen</b> ausgewählt wird, er kann die URL-History über die Popup-Seite in der Hintergrundseite des Add-ons anzeigen lassen und Videos über einer benutzerdefinierten <b>Maximallänge</b> werden nie abgespielt. Es werden weniger Berechtigungen benötigt.</p>\n" +
            "                    <p>Weitere Informationen finden Sie auf der <a target='_blank' href='https://github.com/daniel-rychlewski/stop-autoloop'>GitHub-Seite</a>.</p>\n" +
            "                    <p><b>Entwickelt mit:</b> WebStorm, JavaScript, Chrome-API, DOM-API (v.a. MutationObserver)</p>\n" +
            "                    <img src=\"static/img/Projects/StopAutoloop/autoloop2.png\">";

        document.getElementById("filterlist-text").innerHTML =
            "                    <p>Dieses Repository beinhaltet ein Tool zum Generieren einer Black- oder Whitelist für den Smart-TV LG 42LM670S-ZA (analysiert für die Firmware 04.62.12), welches sowohl von der Kommandozeile als auch über eine graphische Benutzeroberfläche ausgeführt werden kann. Während der Internetzugriff eines Smart-TVs dem Nutzer Funktionalitäten für mehr Unterhaltung bieten kann, will der Nutzer möglicherweise unerwünschte Zugriffe blockieren (z.B. Tracking-Zugriffe), um seine Privatsphäre zu schützen. Daher erlaubt mein Tool das Generieren einer eigenen Filterliste, basierend darauf, wofür der Smart-TV genutzt wird, welche im Anschluss in einen Router importiert werden kann, um nur die spezifizierten Zugriffe zu erlauben/verbieten.</p>\n" +
            "                    <p>Für eine Balance zwischen Nutzbarkeit und Datenschutz macht es Sinn, unerwünschte Requests zu blockieren oder nur erlaubte zuzulassen. Darüber hinaus habe ich in meiner Bachelorarbeit \"Informationsfluss eines Smart-TVs aus dem Heimnetzwerk\" den Einfluss von Echtzeitmanipulation der Requests analysiert und versucht, verschlüsselte Requests abzugreifen. Die Ergebnisse sind in meiner Verteidigung zu finden, in der ich ebenfalls die Bedeutung der Ergebnisse im übergeordneten Zusammenhang von IoT einordne. Eine feingranulare Analyse des Verhaltens des Smart-TVs befindet sich in meinem informellen Forschungsprotokoll. Die Dokumente befinden sich in meinem GitHub-Projekt.</p>\n" +
            "                    <p><b>Entwickelt mit:</b> IntelliJ GUI Designer, Java</p>\n" +
            "                    <img src=\"static/img/Projects/SmartHome/lgsmarttv.jpeg\">";

        document.getElementById("pokerbot-text").innerHTML =
            "                    <p>Auf einer Website haben Spieler die Möglichkeit, mit einer Blockchain-Währung Texas Hold'em Poker zu spielen, doch es fehlt die Option, einen Spieler mit automatisch ausgewählten Aktionen zu verwenden, sodass die Möglichkeit besteht, zeitunabhängig sowie allein gegen den Bot spielen zu können.</p>\n" +
            "                    <p>Um einen solchen simplen Python-Bot zu implementieren, habe ich verschiedene Strategien und Heuristiken durch Simulation mit Evolutionären Algorithmen (z.B. für reinforcement learning) miteinander verglichen, wodurch relevante Parameter angepasst wurden. Zur Performancesteigerung habe ich einen Profiler für die Applikation verwendet und folglich passende Evaluationsframeworks angebunden. Um den Bot auf der Website zum Funktionieren zu bringen, galt es, eine Anbindung an die verwendete API zu realisieren, was mittels Websockets geschah.</p>\n" +
            "                    <p>Als Resultat ist es möglich, dass der Bot ohne viel Aufwand an die Seite angebunden werden kann, um auf Basis der vielversprechendsten Strategien eigenständig Texas Hold'em Poker zu spielen.</p>\n" +
            "                    <p><b>Entwickelt mit:</b> PyCharm, cProfile, line_profiler, Python, PyPokerEngine, deuces, websockets, asyncio, numpy, JSON, Bash, PuTTY(gen)</p>\n" +
            "                    <img src=\"static/img/Projects/Pokerbot/blockstamp.png\">";

        document.getElementById("hyperspectral-text").innerHTML =
            "                    <p>Zur Bilderkennung haben sich neuronale Netzwerke durch hohe Genauigkeiten als erfolgsversprechend herausgestellt. Allerdings erschwert die große Modellgröße deren Einsatz auf mobilen Geräten. Aus diesem Grund beschäftigte ich mich in meiner Masterarbeit mit der Kompression neuronaler Netze, ohne einen signifikanten Genauigkeitsverlust herbeizuführen. Ebenfalls betrachte ich Bildkompression als Möglichkeit, Berechnungsaufwand zu reduzieren, und kombiniere die beiden Kompressionen.</p>\n" +
            "                    <p>Hyperspektrale Bilder verfügen über mehr Spektrentreue und Präzision zur Profilierung von Organismen im Gegensatz zu normalen RGB-Bildern, sodass ich diese für die Untersuchung gewählt habe. Diese Eigenschaften führen aber auch zu einer Vielzahl von Dimensionen, die es zu reduzieren gilt. Es liegt nahe, Dimensionsreduktionstechniken anzuwenden, um sich des Problems der zu vielen Dimensionen anzunehmen. Einerseits kann ich mich dazu entscheiden, Bildkanäle von den üblicherweise mehreren hunderten je nach Relevanz mittels Feature Extraction zusammenzufassen oder irrelevante gleich zu entfernen (Feature Selection). Auf der anderen Seite untersuche ich, wie sinnvoll es ist, das Modell zu komprimieren, indem ich Verbindungen zwischen Neuronen, die am wenigsten zum Endergebnis beitragen, entferne (Parameter Pruning) oder die Gewichte dieser Verbindungen mittels eines Codebooks mit weniger Bits repräsentiere (z.B. Post-Training Vector Quantization). Diese Analyse dient dazu, die Auswirkungen von Kompression auf verschiedenen Ebenen zu prüfen, indem ich die Tradeoffs bzgl. Parameter wie Speicherverbrauch, Berechnungsaufwand und Genauigkeit analysiere und durch Visualisierung der Layer des neuronalen Netzes nachvollziehen will, welche Bildteile besonders relevant für die Aktivierung ausschlaggebender Neuronen sind.</p>\n" +
            "                    <img src=\"static/img/Projects/MasterThesis/master1.png\"><img src=\"static/img/Projects/MasterThesis/master2.png\">\n" +
            "                    <p>Es hat sich herauskristallisiert, dass ein in Maßen angewendetes Parameter Pruning (je nach Modell z.B. 40%) nicht nur keine Erkennungsgenauigkeit verschlechtert, sondern sie im Vergleich zum Referenzmodell sogar erhöht, während Modellgröße, VRAM- und RAM-Verbrauch abnehmen. Erst bei höheren Prozentzahlen als 40-50% leidet die Genauigkeit, zum Ende hin deutlich zunehmend (80-90%). Die Parameteranzahl linearer Layer lässt sich ohne Genauigkeitsverlust in größerem Umfang reduzieren als bei convolutional Layern. Besonders bei großen CNN-Modellen sind erhebliche Größeneinsparungen möglich. Feature Extraction-Verfahren wie PCA, NMF und LLE benötigen nur wenige Bildbänder als Komponenten zum schnellen Erreichen einer zufriedenstellenden Genauigkeit, während sich Feature Selection wesentlich unberechenbarer verhält. Eine komponentenweise Variation mit Post-Training Quantization stellt die Akkumulatoren als wichtigste Komponenten heraus, gefolgt von Aktivierungen und Gewichten des CNNs, jedoch ohne Genauigkeitsgewinn. Die genannten Kompressionen lassen sich akkumulieren, was zu vergleichsweise hohen Genauigkeiten bei noch weniger Komplexität führt. Visualisierungen zeigen, dass erst bei hohen Kompressionszahlen bedeutende Gradienten des CNNs sich merklich verändern und mit ihnen die Genauigkeit. Trotz der zufriedenstellenden Ergebnisse stellt die derzeit mangelhafte Toolunterstützung, insbesondere für den hyperspektralen Fall, das wohl bedeutendste Hindernis für die Nutzung von Pruning und Quantization im industriellen Maßstab dar.</p>\n" +
            "                    <img src=\"static/img/Projects/MasterThesis/master5.png\"><img src=\"static/img/Projects/MasterThesis/master7.png\">\n" +
            "                    <p>Diese Masterarbeit ermöglicht, dass weniger Informationen zur Bilderkennung ausreichen, die beispielsweise durch einen Satelliten auf die Erde übertragen werden müssten. Gleichzeitig wird die performante Bilderkennung auf mobilen Geräten erleichtert, da neuronale Netze oft sogar mit Genauigkeitsverbesserungen kompakter repräsentiert werden können. Die Ergebnisse der Arbeit sind verfügbar unter: https://github.com/daniel-rychlewski/hsi-toolbox</p>\n" +
            "                    <p><b>Entwickelt mit:</b> PyTorch, DeepHyperX, Intel Distiller, Anaconda Python, Pandas, Torch (Lua), visdom, scikit-learn, JSON, PyCharm</p>";

        document.getElementById("planes-text").innerHTML =
            "                    <p>In diesem Projekt verwende ich komprimierte Convolutional Neural Networks zur Klassifikation von Flugzeugen (zwei Klassen: Flugzeug / kein Flugzeug) in RGB-Satellitenbildern, da diese zur Bilderkennung gut geeignet sind. Allerdings benötigen sie viel Platz, den ich mittels Kompression reduzieren will. Ich verwende Parameter Pruning sowie eine optionale Vector Quantization im Anschluss als Kompressionsmethoden. Dabei beobachte ich die Änderungen relevanter Parameter wie Speicherverbrauch und Inferenzzeit. Vor dem Anwenden der Kompressionen finde ich gute Referenzwerte für die Epochs und die Batch Size heraus.</p>\n" +
            "                    <p>Aus technischer Sicht habe ich ein Keras-Modell mit zufriedenstellender Genauigkeit als Grundlage genommen und iteratives Pruning mit keras-surgeon angewandt, welches die Average-Percentage-of-Zeros-Metrik verwendet. Die Quantisierung von Gewichten von 32 zu 8 Bit wird durch den Konverter von Keras realisiert.</p>\n" +
            "                    <p>Eine geringe Batch Size bedeutet eine hohe Klassifikationsgenauigkeit, aber auch mehr möglicherweise auftretende Schwankungen. Parameter Pruning reduziert nicht nur die Größe des Modells, sondern erhöht bis 80% sogar die Klassifikationsgenauigkeit. Fügt man Quantisierung hinzu, haben die Validierungsgenauigkeiten unvorhersehbare Ausreißer. Sowohl Modellgröße als auch Inferenzzeit nehmen linear mit der wachsenden Pruning-Prozentzahl ab.</p>\n" +
            "                    <img src=\"static/img/Projects/Planesnet/3_model_summary.png\">\n" +
            "                    <p><b>Entwickelt mit:</b> Keras, keras-surgeon, TensorFlow, TensorFlow-Lite, Python, Jupyter Notebook, Matplotlib, PyCharm</p>";

        document.getElementById("website-text").innerHTML =
            "                    <p>Um meine Projekte zu zeigen und mich an potentielle Kooperationspartner zu vermarkten, habe ich ein Template mittels Bootstrap 4, jQuery, HTML und CSS angepasst.</p>\n" +
            "                    <p>Internationalisierung und Responsiveness dieser Single-Page Applikation sind dabei meine Prioritäten. Für Ersteres verwende ich stati18n und später auch JS, denn nur JS konnte Text mit HTML-Tags ohne Zeilenumbrüche internationalisieren. Die Farbanpassung habe ich mittels Koala vorgenommen. Jedes Projekt öffnet sich in einem Fenster mit zugehörigen Links, Beschreibungen und Bildern. Die statische Seite wird mit GitHub Pages und Netlify gehostet.</p>\n" +
            "                    <p>Im Ergebnis kann ich meine Fähigkeiten und Interessen wie ich es will präsentieren, ohne auf z.B. LinkedIns vordefiniertes Format angewiesen zu sein. Es macht mich sehr froh, dass Projekte, an denen ich die Leidenschaft und Chance hatte, sie zu implementieren, nicht vergessen oder aufgrund von Platzmangel lediglich in jeweils einer Zeile in meinem Lebenslauf dargestellt werden. Recruiter können Details meiner Selbstdarstellung sehen, die sie interessant finden, sowie relevante Seiten auf GitHub besuchen, Messwerte herunterladen und meine Programme ausprobieren. Jegliche Details, die ich gerne mitteile, können mit dem Kontaktformular beantragt werden. Auch wenn der Gedanke, dass jemand meine Projekte interessant findet und möglicherweise auf einem aufbaut, mich bereits glücklich macht, hoffe ich, dass diese Webseite meine Leidenschaft und Entschlossenheit für das Software Engineering zur Schau stellen konnte 😀</p>\n" +
            "                    <p><b>Entwickelt mit:</b> Bootstrap, HTML, CSS, JavaScript, jQuery, WebStorm, Koala, stati18n, Netlify, GitHub Pages</p>";

        document.getElementById("talentshow-text").innerHTML =
            "                    <p>Der sogenannte Bunte Abend ist eine Veranstaltung des Humboldt-Gymnasiums, bei der sowohl Schüler\n" +
            "                        als auch Lehrer Auftritte eintragen können, die sie zum Bunten Abend vorführen wollen. Das\n" +
            "                        zugehörige Webinterface, das im vierten Semester des Leistungskurses Informatik im Schuljahr\n" +
            "                        2013/14 in einer Gruppenarbeit entwickelt wurde, ermöglicht die Registrierung von Benutzerkonten\n" +
            "                        und deren Verifizierung per Aktivierungsmail, die Anmeldung von Auftritten unter dem jeweiligen\n" +
            "                        Account sowie das Ändern und Löschen der selbst eingetragenen Auftrittsdaten.</p>\n" +
            "                    <p>Administratoren können in einer separaten Ansicht die Auftritte für die Veranstaltung zeitlich\n" +
            "                        in einer Reihenfolge anordnen, freischalten, sperren, über ein SQL-Eingabefeld die Pausenlänge,\n" +
            "                        den Termin des nächsten Bunten Abends und das Sperrdatum, bis zu dem Auftritte registriert\n" +
            "                        werden dürfen, festlegen. Durch Kontaktformulare wird eine einfache Rücksprache zwischen\n" +
            "                        Administrator und Benutzer realisiert und die Verbindlichkeit gewährleistet, die für eine\n" +
            "                        erfolgreiche Planung der Veranstaltung erforderlich ist. Ein Rechtesystem verhindert die\n" +
            "                        Durchführung von Aktionen, zu denen die Benutzer nicht berechtigt sind. Bei der Registrierung\n" +
            "                        wird die Sicherheit des eingegebenen Passworts per JavaScript überprüft. Außerdem wird bei der\n" +
            "                        Registrierung und nach einer fehlgeschlagenen Anmeldung zusätzlich das richtige Ausfüllen eines\n" +
            "                        Captchas gefordert. Zur Installation dient ein Shell-Skript, das die Datenbankstruktur aus einer\n" +
            "                        Datei importiert und die Dateien in das gewünschte Verzeichnis kopiert.</p>\n" +
            "                    <p><b>Entwickelt mit:</b> PHP, MySQL, CSS, HTML, JavaScript, Shell-Scripting, phpMyAdmin, gedit</p>\n" +
            "                    <img src=\"static/img/Projects/BunterAbend/bunterabend.png\">";

        document.getElementById("pacman-text").innerHTML =
            "                    <p>Im Rahmen einer Gruppenarbeit im zweiten Semester des Leistungskurses Informatik im Schuljahr 2012/13 wurde das allseits bekannte Spiel „Pacman“ mithilfe des MVC-Konzeptes in Java implementiert.</p>\n" +
            "                    <p>Der Spieler hat die Aufgabe, alle Kugeln auf dem Feld einzusammeln, um das nächste Level zu erreichen, in welchem sich alle Objekte schneller bewegen als im vorherigen Level. Eingesammelt werden können auch große Kugeln, die die Geister vorübergehend verwundbar machen sowie die gelegentlich in der Spielfeldmitte erscheinenden Früchte, die die Punktzahl des Spielers zusätzlich erhöhen. Immer wenn der Spieler ein Leben verliert, wird diesem die bisher erspielte Punktzahl in der Konsole daneben angezeigt. Das Spiel ist zu Ende, wenn der Spieler alle seiner drei Leben durch Berührungen mit den Geistern verloren hat.</p>\n" +
            "                    <p>Aufgrund des Urheberrechts kann ich das Projekt hier leider nicht teilen. Sollten Sie interessiert am Projekt sein, bitte kontaktieren Sie mich.</p>\n" +
            "                    <p><b>Entwickelt mit:</b> Java Swing, SVN, BlueJ mit Kollaborationswerkzeugen</p>\n" +
            "                    <img src=\"static/img/Projects/Pacman/pacman.png\">";

        document.getElementById("rumble-text").innerHTML =
            "<p>Pokemon Rumble Rush ist ein Videospiel für mobile Plattformen, in dem ein Spieler Level erkundet, um Pokemon zu fangen. Leider ist dies sehr repetitiv, insbesondere zum Erlangen von seltenen Pokemon mit Fünf-Sterne-Attacken.</p>\n" +
            "<p>Zum Glück ist die Bedienung des Spiels so einfach, dass Automatisierungstechniken angewandt werden können. Pokemon können mit einem Attackenstein ausgerüstet werden, dessen Stärke im Arbeitsspeicher vermerkt wird. Zum Stärken der Attacke habe ich daher mit GameGuardian den RAM-Inhalt manipuliert, indem ich zunächst den anfänglichen CP-Wert aufgefunden habe, ein ausgerüstetes Power-Up geändert habe, erneut gesucht habe und den Wert schließlich veränderte. Somit kann ein Boss-Pokemon mit nur einem Einsatz des Angriffssteins besiegt werden.</p>" +
            "<p>Darüber hinaus ist es aufgrund des pixelgenauen Zielens anspruchsvoll, die richtigen Level zu finden, deren Koordinaten einem Google-Docs-Dokument entstammen. Daher nutze ich die Optionen zur Barrierefreiheit unter Android zum Zoom. Bei kniffligen Fällen, stellt Grid-Wichterle ein Raster als Referenz bereit (z.B. ein Wasserlevel, wo in der Umgebung keine Referenzpunkte existieren, an denen man sich orientieren könnte). Durch diese Vorgehensweise können die Level leicht gefunden werden.</p>\n" +
            "<p>Das Herzstück meines Automatisierungsvorhabens stellen die QuickTouch-Makros zum Absolvieren eines Levels dar. In einstellbaren Verzögerungen und Wiederholungen von Tipp- und Wischeingaben habe ich für verschiedene Use-Cases Makros erstellt, die es erlauben, dass das Spiel vollautomatisch ohne Nutzereingabe für einen unbegrenzten Zeitraum gespielt wird, so lange das Akku nicht alle ist, das Handy nicht überhitzt und die Internetverbindung bestehen bleibt. Beispiele dieser Use-Cases sind das wiederholte Absolvieren eines Levels mit allen Pokemon (Common, Uncommon, Sub-Boss, Boss), das Farmen von ausschließlich Boss- und Sub-Boss-Pokemon, das Erfüllen der täglichen Coin-Rush-Challenge, die Auswahl von Pokemon sowie das Absolvieren von Boss-Levels, damit die Pokemon, die auf der Insel gefangen werden können, einen höheren CP-Wert erlangen.</p>\n" +
            "<p>Im Ergebnis können Pokemon automatisiert bekämpft sowie Level und Boss-Pokemon leicht absolviert werden. Das Spiel, das ohne die Makros äußerst langweilig zu spielen wäre, machte mit den Makros Spaß. Nichtsdestotrotz wird das Spiel im Juli 2020 abgeschaltet. Für einen Eindruck, wie die Makros im Spiel funktionieren, klicken Sie bitte auf den Link oben rechts.</p>\n" +
            "<p><b>Entwickelt mit:</b> QuickTouch - Automatic Clicker, GameGuardian, Grid-Wichterle, Android-Einstellungen zur Barrierefreiheit, Google Docs, Pokemon Rumble Rush</p>\n" +
            "<img src=\"static/img/Projects/RumbleRush/stats.jpg\">";

        document.getElementById("pinboard-text").innerHTML =
            "                    <p>Die Implementierung einer Online-Pinnwand aus dem ersten Semester des Leistungskurses Informatik ermöglicht eine Registrierung von Benutzern zum Verfassen von Beiträgen zu einer Pinnwand, wobei der aktuellste Beitrag oben angezeigt wird.</p>\n" +
            "                    <p>Benutzer dürfen, nachdem sie den Link in der Aktivierungsmail aufgerufen haben, Beiträge hinzufügen sowie eigene Beiträge ändern und löschen. Moderatoren sind dazu berechtigt, alle Beiträge freizuschalten und zu sperren, da für normale Benutzer nur freigeschaltete und eigene Beiträge angezeigt werden. Administratoren können zusätzlich dazu in einer tabellarisch strukturierten Benutzerverwaltung alle Benutzerdaten ändern, bestehende Benutzerkonten löschen sowie neue anlegen. Um Spam zu verhindern, wird bei der Registrierung und nach einer misslungenen Anmeldung ein Captcha angezeigt, das zusätzlich richtig ausgefüllt werden muss.</p>\n" +
            "                    <p><b>Entwickelt mit:</b> PHP, MySQL, CSS, HTML, phpMyAdmin, gedit</p>\n" +
            "                    <img src=\"static/img/Projects/Pinnwand/pinnwand.png\">";

        document.getElementById("lostinspace-text").innerHTML =
            "                    <p>Das Minispiel „Lost In Space“ entstand im Rahmen einer Projektarbeit im Profilierungskurs Informatik im Schuljahr 2011/12 in der 10. Klasse. Aufgabe des Spielers ist es, die Rakete durch die Pfeiltasten nach oben und unten so zu bewegen, dass sie die Sterne einsammelt, aber alle übrigen Objekte meidet, um bei jedem der insgesamt drei Levels auf jeweils einen Endgegner zu treffen und diesen mithilfe des Raketenlasers zu besiegen.</p>\n" +
            "                    <p>Der Schwierigkeitsgrad erhöht sich durch die höhere Anzahl der Objekte, welche sich von einer zufälligen y-Koordinate vom rechten Bildschirmrand gleichzeitig nach links auf die Rakete bewegen, die unterschiedlichen Bewegungsrichtungen und Geschwindigkeiten der verschiedenen Objekte, die Anzahl der vom Endgegner gleichzeitig abgeschossenen gegnerischen Laser, denen die Rakete ausweichen muss, die Erfordernis für eine Lasergenehmigung zum Abschießen eines Raketenlasers auf einen Endgegner sowie zusätzliche Schutzschilder der Endgegner, aufgrund derer mehr Treffer mit dem Raketenlaser notwendig sind, um das Level erfolgreich abzuschließen. Dabei wird das Thema Weltraum sowohl musikalisch als auch durch Soundeffekte passend untermalt. Das Spiel ist zu Ende, wenn ein gegnerisches Objekt auf die Rakete trifft oder man alle drei Levels geschafft hat.\n" +
            "                        In beiden Fällen wird dem Spieler die erreichte Gesamtpunktzahl angezeigt, die sich aus der Anzahl ausgewichener gegnerischer Objekte und nicht eingesammelter Sterne berechnet.</p>\n" +
            "                    <i>Anleitung:</i>\n" +
            "                        <ul><li>Benutzen Sie die Pfeiltasten oder w/s zum Bewegen nach oben/unten, Shift zum langsameren Bewegen, Space für den Laser</li>\n" +
            "                        <li>Zielen Sie auf die Mitte des Gegners</li>\n" +
            "                        <li>Sammeln Sie Sterne und Smileys, meiden Sie Asteroiden</li>\n" +
            "                        <li>Sammeln Sie genug Sterne, damit ein Gegner erscheint</li>\n" +
            "                        <li>Sammeln Sie Smileys, um den Laser erneut abschießen zu dürfen</li>\n" +
            "                        <li>Starten Sie das Spiel mittels \"java -jar Lost_In_Space.jar\"</li></ul>\n" +
            "                    <p><b>Entwickelt mit:</b> Java, Greenfoot</p>\n" +
            "                    <img src=\"static/img/Projects/LostInSpace/lostinspace1.png\">\n" +
            "                    <img src=\"static/img/Projects/LostInSpace/lostinspace2.png\">" +
        "                        <p class='small'>Copyright:\n" +
        "                        Pinguin: lewing@isc.tamu.edu Larry Ewing and The GIMP (https://de.wikipedia.org/wiki/Datei:NewTux.svg)<br>" +
        "                        Musik: Y&V - Lune (https://www.youtube.com/watch?v=n79aphwhpW0)\n</p>";

        document.getElementById("wurzelimperium-text").innerHTML =
            "            <p>Wurzelimperium ist ein Spiel, das darauf basiert, Obst und Gemüse in verschiedenen Gärten zu pflanzen, zu gießen und zu ernten, die dem Spieler zur Verfügung stehen. Dazu soll er auf jedes Feld eines Gartens mit einer Größe von 17 * 12 Feldern klicken, wobei es Varianten wie den Wassergarten gibt, zusammen mit einigen anderen Merkmalen des Spiels wie Gilden, Wettbewerbe, Kaktusgärten usw., die hier nicht relevant sein sollen. Offensichtlich wird das Klicken der Felder sehr schnell mühsam. Darüber hinaus erfolgt der Level-Fortschritt im Spiel sehr langsam. Jedoch gibt es eine Premium-Währung namens Coins. Ein Coin ist auf dem In-Game-Marktplatz zehntausende von Wurzeltalern (der In-Game-Währung) wert. Man kann diese Coins durch das Schauen von Werbung bekommen, doch dieses Werbesystem ist meiner Analyse zufolge aus technischer Sicht fehlerbehaftet, sodass der von mir implementierte Proof-of-Concept potentiell unendlich viele Coins durch das angebliche Schauen von Werbung generieren kann.</p>\n" +
            "            <p>Um die Notwendigkeit eines wiederholten Klickens zu beheben, habe ich für Makros den KraTronic-Rekorder und ReMouse verwendet, wobei die letztere Option schneller ist. Die Makros können aufgezeichnet oder durch mein Java-Tool generiert werden. Dies vereinfacht das Pflanzen und Gießen des Gemüses und bietet eine gute Grundlage für die zeitliche Planung von Makros über cron oder den Windows-Taskplaner. Die Planung von Makros auf Remotecomputern oder einer NAS kann besonders nützlich sein für Ereignisse, bei denen man etwa alle 6 Stunden Gemüse ernten und pflanzen soll.</p>\n" +
            "            <p>Zudem ermöglicht das Schauen von Werbung einen schnelleren Spielfortschritt. Anstatt sie jedoch auf VMs zu sehen, auf denen das Werbeerlebnis mit Makros automatisiert wird, können Requests (z.B. mit Fiddler) für denselben Effekt erneut abgespielt werden. Im Wesentlichen muss man einen Token generieren und ihn als Parameter für den Callback verwenden, wie mein YouTube-Video zeigt. Um die Arbeit zu vereinfachen, habe ich ein Java-Programm geschrieben, mit dem der Replay der Requests automatisiert werden kann. Mit diesem Java-Tool kann man auch Werbung aus dem Autokino (einem Ereignis im Spiel) anzeigen, Coins einlösen und die unendliche Questreihe abschließen. Dies sind Quests, die nur an einem bestimmten Ort ausgeführt werden können, zu dem man im Spiel mittwochs und samstags fahren kann, doch dank der fehlerhaften Programmierung kann ich diese Standortbeschränkung umgehen und alle 24 Stunden einen Quest absolvieren.</p>\n" +
            "            <p>Die IntelliJ-Projekte sind nicht mit dem Gedanken von clean code erstellt worden, da das Ziel nicht darin bestand, wartbare Software für einen Klienten zu erstellen, sondern ein Programm so schnell wie möglich nur für mich zum Laufen zu bringen. Aufgrund meiner Automatisierung kann ein Spieler in diesem ansonsten bemerkenswert langsamen Spiel schnell weiterkommen (wer weiß, wann die Server für das Spiel abgeschaltet werden), sodass es tatsächlich Spaß gemacht.</p>\n" +
            "            <p><b>Entwickelt mit:</b> ReMouse Standard, Kra-Tronic Mouse and Key Recorder, Windows- und Synology-Aufgabenplaner, Fiddler, Wireshark, Java 8 (HttpURLConnection, Streams, IO)</p>";

        document.getElementById("hateblock-text").innerHTML =
            "<p>Möchten Sie herausfinden, ob ein Textfragment, das Sie auf einer Website in Ihrem Chrome-Webbrowser sehen, anstößig ist? Diese Erweiterung enthält ein Deep-Learning-Modell, das auf Ihrem Computer ausgeführt wird und das Ihr Bauchgefühl bestätigen oder widerlegen kann, dass ein Text (stark) toxisch, eine Bedrohung, sexuell explizit, obszön, eine Beleidigung oder ein Identitätsangriff ist. Auf diese Weise können Sie überprüfen, ob es nur Ihre Meinung ist oder ob der Text tatsächlich hasserfüllt ist. Abgesehen davon besteht der Zweck dieser App darin, mit Tensorflow.js zu experimentieren, damit jeder Benutzer sehen kann, was ein eingebautes Deep-Learning-Modell, das auf einem Universal Sentence Encoder basiert, kann, ohne etwas über KI verstehen zu müssen. Die Klassifizierung funktioniert nur für englische Texte und berücksichtigt die sieben oben genannten Kategorien.</p>\n" +
            "<p>So funktioniert es: Klicken Sie mit der rechten Maustaste auf eine Textauswahl und wählen Sie \"Analyze for hate\" (= \"Auf Hass analysieren\"). Dies löst die Inferenz des Modells aus, das das für TensorFlow.js verfügbare Beispiel für die Erkennung von Texttoxizität ist. Nach Abschluss der Inferenz (kann bis zu einigen Sekunden dauern) wird der Text mit einer Farbe hervorgehoben, je nachdem, ob der Hass-Typ oder dessen Fehlen erkannt wurde oder das Ergebnis nicht eindeutig ist. Bewegen Sie den Mauszeiger über den markierten Text, um herauszufinden, welche der sieben Kategorien erkannt wurden, von denen eine zum farblichen Hervorheben verwendet wird. Der Benutzer kann im Popup-Menü des Addons anpassen, welches der sieben Kriterien das Modell für die Analyse verwenden soll. Klicken Sie einfach auf das Symbol der Erweiterung, wählen Sie die gewünschte Option aus dem Dropdown-Menü und speichern Sie Ihre Änderungen mit dem Speichern-Button. Hier können Sie auch die drei Farben anpassen, die zum Hervorheben verwendet werden.</p>\n" +
            "<p>Weitere Informationen finden Sie auf der <a target='_blank' href='https://github.com/daniel-rychlewski/hateblock'>GitHub-Seite</a>.</p>\n" +
            "<p><b>Entwickelt mit:</b> TensorFlow.js, WebStorm, JavaScript, Chrome API (Popup-Seite und Kontextmenü), DOM API</p>\n" +
            "<img src=\"static/img/Projects/HateBlock/hateblock1.png\">\n" +
            "<img src=\"static/img/Projects/HateBlock/hateblock2.png\">";

        document.getElementById("start-description-1").innerHTML = "Ich bin ein Software-Ingenieur mit vielfältiger Erfahrung in Full-Stack-Projekten.";
        document.getElementById("start-description-2").innerHTML = "Falls Sie etwas auf dieser Seite interessiert, freue ich mich auf Ihre <a href=\"#contact\">Kontaktaufnahme</a>! Ich bin immer gespannt auf neue Chancen und freue mich auf die Zusammenarbeit mit Ihnen.";
        document.getElementById("start-description-3").innerHTML = "Die <a href=\"#work\">Projekte</a>, die Sie auf dieser Webseite finden, wurden alle von mir selbst durchgeführt.";

        document.getElementById("role-1").innerHTML = "Full-Stack Software-Ingenieur";
        document.getElementById("role-2").innerHTML = "Backend-Entwickler";

        document.getElementById("onevshundred-heading").innerHTML = "1 gegen 100";
        document.getElementById("onevshundred-subtitle").innerHTML = "Teilnahme am Zuschauerwettbewerb";
        document.getElementById("autoloop-heading").innerHTML = "Stop AutoLoop";
        document.getElementById("autoloop-subtitle").innerHTML = "Verhindert Autoplay-Schleifen";
        document.getElementById("filterlist-heading").innerHTML = "Filterliste für Smart-TV generieren";
        document.getElementById("filterlist-subtitle").innerHTML = "Nutzbarkeit vs. Datenschutz";
        document.getElementById("pokerbot-heading").innerHTML = "Texas Hold'em Bot";
        document.getElementById("pokerbot-subtitle").innerHTML = "KI mit herausfordernder Strategie";
        document.getElementById("hyperspectral-heading").innerHTML = "Hyperspektrale Klassifikation mit komprimierten CNNs";
        document.getElementById("hyperspectral-subtitle").innerHTML = "Reduzierte Dimensionalität von Modell und Bild";
        document.getElementById("planes-heading").innerHTML = "Flugzeugerkennung in Satellitenbildern durch komprimierte CNNs";
        document.getElementById("planes-subtitle").innerHTML = "Copyright: CC-BY-SA rhammell https://www.kaggle.com/rhammell/planesnet";
        document.getElementById("website-heading").innerHTML = "www.danielrychlewski.com";
        document.getElementById("website-subtitle").innerHTML = "Meine eigene Webseite";
        document.getElementById("talentshow-heading").innerHTML = "Bunter Abend";
        document.getElementById("talentshow-subtitle").innerHTML = "Registrierung und Verwaltung von Auftritten";
        document.getElementById("pacman-heading").innerHTML = "Pacman in Java";
        document.getElementById("pacman-subtitle").innerHTML = "MVC-Implementation des Spiels";
        document.getElementById("rumble-rush-heading").innerHTML = "Pokemon Rumble Rush";
        document.getElementById("rumble-rush-subtitle").innerHTML = "Automatisierung mobiler Spiele mit Makros";
        document.getElementById("pinboard-heading").innerHTML = "Online-Pinnwand";
        document.getElementById("pinboard-subtitle").innerHTML = "CRUD-Applikation mit RBAC-Zugriffskontrolle";
        document.getElementById("lostinspace-heading").innerHTML = "Lost in Space";
        document.getElementById("lostinspace-subtitle").innerHTML = "Erkunden Sie das Weltall mit der Rakete!";

        document.getElementById("onevshundred-modal-heading").innerHTML = "1 gegen 100";
        document.getElementById("autoloop-modal-heading").innerHTML = "Stop AutoLoop";
        document.getElementById("filterlist-modal-heading").innerHTML = "LG 42LM670S-ZA Filterlisten-Generierungstool";
        document.getElementById("pokerbot-modal-heading").innerHTML = "Texas Hold'em Bot";
        document.getElementById("pokerbot-modal-play").innerHTML = "Jetzt spielen!";
        document.getElementById("hyperspectral-modal-heading").innerHTML = "Hyperspektrale Klassifikation von Satellitenbildern mittels komprimierter neuronaler Netze";
        document.getElementById("planes-modal-heading").innerHTML = "Analyse der Modellkompressionsverfahren \"parameter pruning\" und \"vector quantization\" für Convolutional Neural Networks am Beispiel von Satellitenbildern";
        document.getElementById("planes-modal-download").innerHTML = "Messungen herunterladen";
        document.getElementById("planes-modal-github").innerHTML = "GitHub-Projekt";
        document.getElementById("wurzelimperium-modal-github").innerHTML = "GitHub-Projekt";
        document.getElementById("website-modal-heading").innerHTML = "Meine Webseite";
        document.getElementById("talentshow-modal-heading").innerHTML = "Bunter Abend Planungs- und Verwaltungstool";
        document.getElementById("pacman-modal-heading").innerHTML = "Pacman in Java";
        document.getElementById("rumble-modal-heading").innerHTML = "Pokemon Rumble Rush";
        document.getElementById("rumble-modal-download").innerHTML = "Bilder herunterladen";
        document.getElementById("rumble-modal-see").innerHTML = "Demo-Videos";
        document.getElementById("wurzelimperium-modal-see").innerHTML = "Demo-Videos";
        document.getElementById("pinboard-modal-heading").innerHTML = "Online-Pinnwand";
        document.getElementById("lostinspace-modal-heading").innerHTML = "Lost in Space";
        document.getElementById("lostinspace-modal-playdownload").innerHTML = "Jetzt herunterladen und spielen!";
        document.getElementById("skills-modal-heading").innerHTML = "Kenntnisse";
        document.getElementById("wurzelimperium-heading").innerHTML = "Wurzelimperium";
        document.getElementById("wurzelimperium-subtitle").innerHTML = "Makro-Automatisierung und Aufgabenplanung";
        document.getElementById("wurzelimperium-modal-heading").innerHTML = "Wurzelimperium";
        document.getElementById("hateblock-heading").innerHTML = "Hate Block";
        document.getElementById("hateblock-subtitle").innerHTML = "Clientseitige Hasserkennung mit einem Universal Sentence Encoder";
        document.getElementById("hateblock-modal-heading").innerHTML = "Hate Block";

        let close = "Schließen";
        document.getElementById("skills-close").innerHTML = close;
        document.getElementById("onevshundred-close").innerHTML = close;
        document.getElementById("autoloop-close").innerHTML = close;
        document.getElementById("filterlist-close").innerHTML = close;
        document.getElementById("pokerbot-close").innerHTML = close;
        document.getElementById("hyperspectral-close").innerHTML = close;
        document.getElementById("planes-close").innerHTML = close;
        document.getElementById("website-close").innerHTML = close;
        document.getElementById("talentshow-close").innerHTML = close;
        document.getElementById("pacman-close").innerHTML = close;
        document.getElementById("rumble-close").innerHTML = close;
        document.getElementById("pinboard-close").innerHTML = close;
        document.getElementById("lostinspace-close").innerHTML = close;
        document.getElementById("hackathon-close").innerHTML = close;
        document.getElementById("imprint-close").innerHTML = close;
        document.getElementById("privacy-close").innerHTML = close;
        document.getElementById("wurzelimperium-close").innerHTML = close;
        document.getElementById("hateblock-close").innerHTML = close;

        document.getElementById("imprint-link").innerHTML = "Impressum";
        document.getElementById("privacy-link").innerHTML = "Datenschutz";
        document.getElementById("privacy-heading").innerHTML = "Datenschutzerklärung";

        document.getElementById("skillSearch").placeholder = "Kenntnis suchen";

    } else if (language === 'pl') {
        document.getElementById("on-request-description").innerHTML = "Życiorys, referencje pracodawców, dyplomy: dostępne na życzenie";
        document.getElementById("certificates-description").innerHTML = "Niektóre z moich certyfikatów są również wymienione na moim profilu <a target='_blank' href='https://www.youracclaim.com/users/daniel-rychlewski/'>Acclaim</a>.";
        document.getElementById("about-me-description").innerHTML = "<span class='theme-color'>Inżynier oprogramowania</span> w <span class='theme-color'>Zurichu</span>";
        document.getElementById("service-1-description").innerHTML = "Pracowałem <b>z różnymi narzędziami i frameworkami</b> w czasie mojej kariery. Wybranie właściwych dla każde wymaganie dla najlepszej <b>naprawialności</b> programu jest serwisem, z którym Państwo może liczyć.";
        document.getElementById("service-2-description").innerHTML = "<b>Zapewnianie jakości</b> zawsze stanowiło ważną część mojej pracy. Mogą Państwo na mnie liczyć, że będe implementował właściwe testy jako część mojego serwisu, aby ulepszyć <b>zrozumiałość</b> Państwa aplikacji.";
        document.getElementById("service-3-description").innerHTML = "Implementowanie produktów o minimalnej koniecznej funkcjonalności (MVP) jak i realnych produktów pod <b>presją czasu</b> w ramach ustalonego budżetu był latami moim chlebem powszednim. Nawet w przypadku któtkich terminów możecie Państwo oczekiwać <b>dostarczenie produktu na czas</b>.";
        document.getElementById("service-4-description").innerHTML = "Regularnie integruje Państwa <b>opinie</b> do mojego przepływu pracy, aby zapewnić, że jestem na dobrej drodze, żeby spełnić Państwa wymagania. Przez to, jakiekolwiek nieporozumienie szybko zostaje wyjaśnione, co gwarantuje Państwu <b>opłacalność</b>.";
        document.getElementById("service-5-description").innerHTML = "Nadążanie za <b>najnowszymi trendami technicznymi</b> przez samodzielną naukę i praktyczne projekty pozwala mi na implementację Państwa wizji na najwyższym poziomie jakości z <b>nowoczesnym design</b>, zarówno na powierzchni jak i pod maską.";
        document.getElementById("service-6-description").innerHTML = "Będąc świadomy otaczającej mnie bańce technologicznej w której działam, jestem w stanie <b>przetłumaczyć wymagania biznesowe</b> w zrozumiały język i odwrotnie. Przecież moje serwisy mają <b>slużyć klientowi</b>.";
        document.getElementById("further-programming-skills").innerHTML = "<b>"+furtherSkills+"</b> PHP, Matlab, Groovy, Shell Scripting, programowanie rozszerzeń Chrome, C, Haskell, Visual Basic, Prolog, C#, JSON/BSON, HTML, CSS";
        document.getElementById("databases-relational").innerHTML = "<b>"+relationalDatabases+"</b> MySQL, MSSQL, H2, DB2 (db2top, db2expln), MariaDB";
        document.getElementById("databases-nosql").innerHTML = "<b>"+noSQLDatabases+"</b> MongoDB";
        document.getElementById("databases-orm").innerHTML = "<b>"+ormOdm+"</b> Mongoose, Hibernate, JPA";
        document.getElementById("databases-administration").innerHTML = "<b>"+administration+"</b> NoSQLBooster, Compass, phpMyAdmin, IBM Data Studio";
        document.getElementById("skills-swe").innerHTML = "<b>"+furtherSkills+"</b> XP, model kaskadowy, model V, model spiralny";
        document.getElementById("ide-skills").innerHTML = "<b>"+furtherSkills+"</b> Netbeans, <a title='symulator zdarzeń dyskretnych C++, przede wszystkim dla symulacji sieci'>OMNeT++</a>, Matlab, BlueJ, SAP BusinessObjects";
        document.getElementById("skills-testing").innerHTML = "<b>"+furtherSkills+"</b> <a title='strukturalny test i analiza programów'>SOTA</a>, <a title='edytor drzew klasyfikacyjnych'>TESTONA</a>, <a title='automatyczne testowanie regresyjne programów Java'>ATOSj</a>";
        document.getElementById("skills-version-control").innerHTML = "<b>"+furtherSkills+"</b> Bitbucket, TortoiseGit, RapidSVN";
        document.getElementById("skills-architecture").innerHTML = "REST API, mikroserwisy, klient-serwer, monolit, long polling, WebSocket";

        document.getElementById("angular-title").title = "Opracowanie stron internetowych, zarówno od początku, jak i utrzymanie / naprawianie blędów. Na przykład dla wersji MVP systemu dla replikacji baz danych dla przebudowy szpitalu, ale również dla systemu zarządzania projektami.";
        document.getElementById("javascript-title").title = "Moje rozszerzenie do Chrome 'Stop AutoLoop', które zapobiega pętli wideo na YouTubie, jest napisane wyłącznie w JavaScript";
        document.getElementById("cpp-title").title = "Zarówno w Uniwersytecie Humboldta jak i w trakcie mojej wymiany semestralnej w Uniwersytecie Swansea nauczyłem się o polimorfiźmie, sprytnych wskaźników, szablonach, RAII, vTable i vPtr, semantyka move, konwersje typu, przeciążenie operatorów, lambdy, wątki, struktury danych STL i itd.";
        document.getElementById("pytorch-title").title = "Ten framework do deep learning był podstawą mojej pracy magisterskiej ponieważ autorzy skomplikowanych modelów (np. z operacjami dzielącymi tensory) wybrali PyTorch do implementacji ich idei. Razem wzięte, to umożliwiało selekcję z wielu modelów deep learning w pakiecie DeepHyperX. Z mojego doświadczenia, PyTorch nie był dobrym wyborem dla zadań o kompresji tak jak parameter pruning bo potrzebuje rozmiary tensorów wejściowych i wyjściowych zawierane w kodzie, czyli w modelu, co utrudnia dynamiczne dopasowanie rozmiarów, np. w czasie wykonania channel pruning (Keras moim zdaniem byłaby lepszą opcją). Co najważniejsze, sprężane modele PyTorch nie są mniejsze niż oryginały, przeciwdziałając jednej z najważniejszych zalet kompresji modelów.";
        document.getElementById("keras-title").title = "Ten wysokopoziomowy framework do deep learning zbudowany na TensorFlow umożliwił mi łatwą konfigurację warstw i parametrów modeli dla klasyfikacji zdjęć satelitarnych w moim projekcie badań.";
        document.getElementById("keras-surgeon-title").title = "Dla mojego projektu badań o klasyfikacji zdjęć satelitarnych przez sprężane sieci neuronowe, keras-surgeon oferował parameter pruning na podstawie metryki average percentage of zeros. Przez to mogłem sprawdzić czy mniejszy model uzyskuje taką samą trafność klasyfikacji, zmieniając parametry jak epoki, wielkość serii, prozent dla pruning i dodanie quantization. W przeciwieństwie do PyTorch, fizyczny rozmiar modelu zmniejsza się po pruning.";
        document.getElementById("tfjs-title").title = "Moje rozszerzenie Hate Block do Chrome wykorzystuje TensorFlow.js do wnioskowania po stronie klienta, aby dowiedzieć się, czy tekst jest nienawistny.";
        document.getElementById("tflite-title").title = "Dla mobilnego opracowywania modelów deep learning do plików tflite, to jest framework, którego używałem dla mojej pracy magisterskiej.";
        document.getElementById("scikit-title").title = "SVM, SVD, k-NN i inne klasyfikatory dla mojej pracy magisterskiej o kompresji sieci neuronowych dla hiperspektralnej klasyfikacji zdjęć.";
        document.getElementById("pandas-title").title = "Obliczenie średniej, odchylenia standardowego, logowanie Excel dla mojej pracy magisterskiej o kompresji sieci neuronowych dla hiperspektralnej klasyfikacji zdjęć.";
        document.getElementById("torch-title").title = "Dla mojej pracy magisterskiej o hiperspektralnej kompresji, widziałem modele w języku Lua i frameworku Torch, co jest poprzednikiem PyTorcha.";
        document.getElementById("jupyter-title").title = "Tak jak Jupyter Notebook jest użyteczny dla data science i szybkiego skryptowania Pythonem, również się nadaje do modelów deep learning, które zbadałem dla mojej pracy magisterskiej.";
        document.getElementById("deephyperx-title").title = "DeepHyperX jest hiperspektralnym frameworkiem dla deep learning. Rozwinąłem ten framework dla mojej pracy magisterskiej prez zintegrowanie drobnoziarnistego pruningu, wyboru i wydzielania zdjęć jak i innych modelów i hiperspektralnych zestawów danych. Więcej szczegółów umieściłem na moim projekcie hsi-toolbox na GitHubie.";
        document.getElementById("visdom-title").title = "visdom wyświetlał hiperspektralne zestawy danych, którym się zajmowałem w mojej pracy magisterskiej. Do tego należał monitoring nadziemny (ground truth), ale też klasyfikowane zestawy danych po rodzieleniu w części train, validation, i test.";
        document.getElementById("distiller-title").title = "Intel Distiller stanowił framework dla gruboziarnistego pruningu i szczególnej dla komponentów kwantyzacji po treningu (aktywacje, wagi, akumulatory) dla mojej pracy magisterskiej.";
        document.getElementById("scrum-title").title = "Pracowałem w różnych projectach w Scrum, wraz z jego zasadami jak daily standups, retrospektywy, wykaz prac sprintu, burn-down charty etc.";
        document.getElementById("cprofile-title").title = "cProfile był zintegrowany w PyCharm i dał mi spostrzec że API kart, którą na początek używałem dla Pythonowego botu pokera dla Texas hold 'em, była utrudnieniem wydajności, które musiało być zastąpiony przez szybszą alternatywę, co zrobiłem. Jako rezultat, aż tyle czasu mogło być oszczędzone dla procesu reinforcement learning, że dopero to umożliwiło symulację. Bez wymiany API trwałaby za długo.";
        document.getElementById("jprofiler-title").title = "JProfiler pomógł zidentyfikować utrudnienia w rozwiązaniu CPM, na którym pracowałem przez rok. Przez to staneło się rozwiązaniem dużo szybsze, goniąc konkurencję.";
        document.getElementById("lineprofiler-title").title = "Jak nazwa wskazuje, line profiler umie profilować program Pythonowy linijka po linijce, co najpierw brzmiało dla mnie interesujące dla Pythonowego bota grającego w pokera. Niestety okazało się gorszym rozwiązaniem niż cProfile w sprawie użyteczności i ziarnistość linijkowa nie była potrzebna w moim scenariuszu. Dlatego jednak zdecydowałem się na cProfile.";
        document.getElementById("tina-title").title = "Oprogramowanie symulacji sieców Petriego";
        document.getElementById("hets-title").title = "Analiza specyfikacji CASL; udowadniacz twierdzeń";
        document.getElementById("slx-title").title = "Język modelowania zbudowany na współprogramach";
        document.getElementById("intellij-title").title = "Mój ulubiony IDE, z którym programowałem liczne projekty, np. rozwiązanie CPM, system zarządzania projektami i dużo własnych projektów.";
        document.getElementById("pycharm-title").title = "Dla szukania strategii dla bota pokerowego do gry w Texas hold 'em i dla łączenia frameworków deep learning dla mojego frameworku hsi-toolbox dla pracy magisterskiej.";
        document.getElementById("webstorm-title").title = "IDE, którym programuję tą stronę internetową z HTML, JS / jQuery i CSS / Bootstrap.";
        document.getElementById("android-studio-title").title = "Tworzenie aplikacji Android dla elektronicznego zarządzania tożsamością lekarzy dla szpitalów i aptek; teoretyczne podstawy jak cykl aplikacji, zamiary, zasoby, uprawnienia, dostawcy treści, eksternalizacja, grafiki, mapy itd.";
        document.getElementById("visual-studio-code-title").title = "Mój wybór dla aplikacji Node.js/Express.js jak przeze mnie oprogramowany system replikacji baz danych.";
        document.getElementById("xcode-title").title = "Programowanie aplikacji iOS dla elektronicznego zarządzania tożsamością lekarzy dla szpitalów i aptek";
        document.getElementById("azure-title").title = "Jako część hackatonu Microsoft pod tytułem 'Enhance your student life' w Berlinie w 2019 roku, moja grupa używała te trzy technologie Azure, aby generować fiszki na podstawie notatków z wykładów, żeby studenci mogli się łatwiej przygotować na egzamin, korzystając z najlepszego materiału przygotowawczego.";
        document.getElementById("oci-title").title = "Pandemia COVID-19 była moją szansą, aby rozwijać moją wiedzę w temacie cloud przez oglądanie kursów OCI, które były dostępne za darmo. Również zdobyłem certyfikat OCI Foundations 2020. Tematy to:\n"+
            "funkcje: serwis Kubernetes / Registry;\n"+
            "pamięć: Block / File / Object / Archive Storage, lokalne NVMe;\n"+
            "sieć: VCN, kompartmenty, gatewaye, load balancery, peering;\n"+
            "IAM: zasady, SL, NSG;\n"+
            "(samodzielne) bazy danych: VM, BM, RAC, Exadata, ADW, ATP.";
        document.getElementById("bpmn-title").title = "Koncepcje i zasady uczone w Uniwersytecie Humboldta.";
        document.getElementById("z-title").title = "Formalny język specyfikacji, którego używałem do modelowania semantycznych wymagań dla klas, włączając zmienność i ograniczenia wartościowe dla zmiennych.";
        document.getElementById("mcrl-title").title = "Formalny język specyfikacji dla systemów jednoczesnych, używany dla określenia równoważności jak symulacji, symulacyjnej równoważności i bisymulacji dla systemów przejściowych.";
        document.getElementById("casl-title").title = "Common Algebraic Specification Language";

        document.getElementById("certificate-deutschlandstipendium-description").innerHTML = "Przyznany z uwagi na wybitne rezultaty w studiach informatyki (M.Sc.), umożliwiony przez sponsora <a target=\"_blank\" href=\"https://www.picoquant.com/\">PicoQuant</a>";

        document.getElementById("onevshundred-text").innerHTML = "<p>Teleturnier oferuje konkurs widzów, w którym można wypełnić swoje dany osobiste. Po uzupełnieniu captcha i wysłaniu formularza, osoba uczestniczy w turnieju. Chciałem ten proces zautomatyzować, żeby tygodniowo zaplanowane zdarzenie automatycznie brało udział, np. przez cron. Przy tym zapoznałem się z klientem HTTP/2 w Javie 11, przede wszystkim dotycząco programowania asynchronicznego i funkcjonalnego.</p>\n" +
            "<p>Aby wypełnić captcha, podłączyłem API od anti-captcha.com, które od użytkownika wymaga pasującego kluczu API. Dany osobowe jak imię, nazwisko, adres email, adres, kod pocztowy, miejsce i numer telefonu, które są wymagane dla wypełnienia formularza, mogą zostać dodane do plików źródła Java. Nagrywanie poszczególnych żądań dla uczestnictwa używając Fiddlera pozwoliło mi zrekonstruować żądanie w Javie.</p>\n" +
            "<p>W rezultacie, program umożliwia uczestnictwo w turnieju za naciśnięciem przycisku. Jednakże w trudnych przypadkach jak przeciążonym serwerze, wyjątków przez API anti-captcha (np. ConcurrentCompletionException) i brakiem dostępnych pracowników dla rozwiązanie captcha nadal muszą być rozwiązane, np. z regułą ponawiania lub przez automatyczny przyrost pieniędzy za captcha aż pracownik staje się dostępny.</p>\n" +
            "<p><b>Technologie użyte:</b> Java 11 (przede wszystkim konstruktor HTTP/2), IntelliJ IDEA, API anti-captcha.com, Fiddler</p>";

        document.getElementById("autoloop-text").innerHTML =
            "                    <p>Funkcja YouTuba pod nazwą autoplay doprowadza do sytuacji, w których wideo już widziane jest odtwarzane jako następne. Takie pętle składające się z <b>tych samych dwóch wideów</b> powtarzających się (w najgorszym wypadku) nie są koniecznie pożądane. Dlatego te rozszerzenie przeglądarki umie przekierować wideo autoplay, które jako następne ma być odtwarzane. Nastąpi to wtedy, gdy rozszerzenie wykrywa, że wideo już zostało oglądane. Ono działa zarówno dla zakładki na pierwszym planie jak i w tle.</p>\n" +
            "                    <p>Będąc bardziej precyzyjnym, rozszerzenie dodaje adres URL każdego widea YouTube oglądanego przez użytkownika do swojej <b>historii URL</b>. To umożliwia analizę, czy wideo już zostało obejrzane. Gdy strona YouTube jest otwierana, strona jest analizowana na <i>listę rekomendacji YouTube</i>. One są <b>kandydatami</b>, wśród których następne wideo jest wybierane. Bez rozszerzenia, zawsze pierwsze wideo wśród kandydatów byłoby wybrane, jeżeli funkcja autoplay jest włączona. Strona YouTuba jest również skanowana na <b>przełącznik autoplay</b> (gdy jest wyłączony, rozszerzenie niczego nie robi). Ponadto, końce klip wideo są wykryte przez rozszerzenie <i>na pierwszym planie</i>. Karty w tle nie mają takiego <b>procesu przemian</b> do następnego nagrania wideo autoplay, więc są przekierowane gdy taka strona YouTuba jest odwiedzona, której wideo już zostało obejrzane.</p>\n" +
            "                    <p>Rozszerzenie ma opcje dostosowania w stronie ustawień, do której użytkownik dostaje się przez ikone (\"Settings\"). Może on zdecydować, czy <b>playlisty</b> w rekomendacjach YouTube mają być uwzględnione jako kandydaci dla następnego pliku wideo czy nie, czy historia URL ma być <b>skasowana</b> po przekierowaniu ze względu na potencialną pętlę, czy przełącznik autoplay ma skasować historię URL i kontrolować <b>okres sprawdzający</b> stronę. Ustawienia mogą być zresetowane. Symbol też pozwala na ręczne kasowanie historii URL, co zostanie potwierdzone w stronie w tle.</p>\n" +
            "                    <p>Od wersji 1.1, używanie <b>czarnych i białych list</b> jest możliwe, użytkownik może wybrać <b>która z rekomendacji</b> ma być wybrana przez rozszerzenie, on może wyświetlać historię URL przez stronę kontekstową do strony w tle i widea dłuższe niż zdefiniowany przez użytkownika <b>maksimum</b> w minutach nigdy nie są odtwarzane. Uprawnienia są mniej wymagające.</p>\n" +
            "                    <p>Więcej informacji można znaleźć na <a target='_blank' href='https://github.com/daniel-rychlewski/stop-autoloop'>stronie Github</a>.</p>\n" +
            "                    <p><b>Technologie użyte:</b> WebStorm, JavaScript, API Chrome, API DOM (przede wszystkim MutationObserver)</p>\n" +
            "                    <img src=\"static/img/Projects/StopAutoloop/autoloop2.png\">";

        document.getElementById("filterlist-text").innerHTML =
            "                    <p>To repozytorium zawiera narzędzie do generowania czarnej lub białej listy dla inteligentnego telewizora LG 42LM670S-ZA (analizowane pod kątem oprogramowania układowego 04.62.12), co można wykonać z wiersza poleceń lub za pomocą graficznego interfejsu użytkownika. Chodzi o to, że chociaż dostęp do Internetu inteligentnego telewizora zapewnia użytkownikowi dodatkową rozrywkę, użytkownik może chcieć zapobiec niechcianym requestom (np. w celu śledzenia) w celu zwiększenia swojej prywatności. Dlatego moje narzędzie pozwala wygenerować niestandardową listę filtrów na podstawie wykorzystania inteligentnej telewizji użytkownika, którą można następnie zaimportować do routera, aby zablokować / zezwolić tylko na określone żądania.</p>\n" +
            "                    <p>Aby zachować równowagę między użytecznością a prywatnością, sensowne jest blokowanie niepożądanych żądań lub dopuszczanie tylko żądanych. Idąc dalej, przeanalizowałem wpływ manipulacji żądaniami w czasie rzeczywistym i próbowałem podsłuchiwać zaszyfrowane żądania w mojej pracy licencjackiej „Przepływ informacji inteligentnego telewizora z sieci domowej”. Wyniki można znaleźć w mojej obronie pracy dyplomowej, w której również zajmowałem się znaczeniem wyników dla szerszego obrazu Internetu Rzeczy. Dokładną analizę zachowania inteligentnego telewizora można znaleźć w (nieformalnym) protokole badawczym. Dokumenty można znaleźć w moim projekcie GitHub.</p>\n" +
            "                    <p><b>Technologie użyte:</b> IntelliJ GUI Designer, Java</p>\n" +
            "                    <img src=\"static/img/Projects/SmartHome/lgsmarttv.jpeg\">";

        document.getElementById("pokerbot-text").innerHTML =
            "                    <p>Na stronie można grać w Texas Hold 'em poker przy użyciu waluty opartej na blockchain, ale nie ma opcji korzystania z gracza z automatycznie wybranymi działaniami, aby ludzie mogli grać przeciwko temu botowi samodzielnie i niezależnie od pory dnia.</p>\n" +
            "                    <p>Aby realizować prostego bota Python, porównałem kilka strategii i heurystyk poprzez symulację z algorytmami ewolucyjnymi (np. dla reinforcement learning), aby można było dostosować odpowiednie parametry. W celu ulepszenia wydajności profilowałem aplikację i w rezultacie podłączyłem odpowiednie frameworki. Aby bot działał na stronie internetowej, konieczne było połączenie z używanym API, które zostało wykonane przy użyciu WebSockets.</p>\n" +
            "                    <p>W rezultacie, bot może zostać podłączony do strony bez większego wysiłku, aby sam mógł grać w pokera Texas Hold'em w oparciu o strategie, które najprawdopodobniej wygrywają.</p>\n" +
            "                    <p><b>Technologie użyte:</b> PyCharm, cProfile, line_profiler, Python, PyPokerEngine, deuces, websockets, asyncio, numpy, JSON, Bash, PuTTY(gen)</p>\n" +
            "                    <img src=\"static/img/Projects/Pokerbot/blockstamp.png\">";

        document.getElementById("hyperspectral-text").innerHTML =
            "                    <p>Sieci neuronowe okazały się skutecznym narzędziem do rozpoznawania obrazów ze względu na wysoką dokładność, jaką osiągają. Jednak duży rozmiar modelu utrudnia ich wdrożenie na urządzeniach mobilnych. Dlatego postanowiłem zbadać kompresję sieci neuronowych bez powodowania znacznej utraty dokładności w mojej pracy magisterskiej. Ponadto wykonuję kompresję obrazu jako sposób na zmniejszenie złożoności obliczeniowej i połączenie obu typów kompresji.</p>\n" +
            "                    <p>Obrazy hiperspektralne mają większą wierność spektralną i precyzję do profilowania organizmów niż obrazy RGB, dlatego wybrałem je do projektu. Niemniej jednak właściwości te prowadzą do dużej liczby wymiarów, które należy zmniejszyć, np. za pomocą technik zmniejszania wymiarów. Z jednej strony można zdecydować o zmniejszeniu liczby zwykle setek kanałów obrazu zgodnie z ich stosownością za pomocą funkcji dla ekstrakcji (feature extraction) lub usunięcia nieistotnych kanałów (feature selection). Z drugiej strony badam przydatność kompresji modelu, usuwając połączenia między neuronami, które w najmniejszym stopniu przyczyniają się do wyniku końcowego (parameter pruning), i używam książki kodów do reprezentowania wag tych połączeń przy użyciu mniejszej liczby bitów (np. post-training vector quantization). Celem tej procedury jest zbadanie skutków kompresji na wielu poziomach poprzez analizę kompromisów dotyczących parametrów takich jak użycie pamięci, koszt obliczeniowy i precyzja oraz wizualizacja warstw sieci neuronowej w celu zrozumienia, które części obrazu są najbardziej istotne dla aktywacji decydujących neuronów.</p>\n" +
            "                    <img src=\"static/img/Projects/MasterThesis/master1.png\"><img src=\"static/img/Projects/MasterThesis/master2.png\">\n" +
            "                    <p>Okazało się, że umiarkowane przycinanie parametrów (w zależności od modelu, nawet do 40 procent) nie tylko nie zmniejsza dokładności klasyfikacji, ale nawet poprawia ją w porównaniu do odniesienia, podczas gdy rozmiar modelu, użycie pamięci VRAM i pamięci RAM spada. Tylko przy wartościach procentowych większych niż 40 do 50 procent dokładność pogarsza się, co pogarsza się coraz bardziej pod koniec (pruning od 80 do 90 procent). Liczbę parametrów w warstwach liniowych można zmniejszyć bardziej niż w przypadku warstw splotowych bez utraty dokładności. W szczególności, duże modele CNN oferują znaczny potencjał zmniejszenia rozmiaru modelu. Techniki ekstrakcji cech (feature extraction), takie jak PCA, NMF i LLE, wymagają tylko kilku pasm obrazu jako składników, aby szybko osiągnąć wysoką dokładność, a wybór funkcji (feature selection) działa znacznie mniej przewidywalnie. Wariacja składowa z kwantyzacją po treningu ujawnia, że akumulatory są najważniejszymi składnikami, po których następują odpowiednio aktywacje i wagi CNN, ale bez zwiększenia dokładności. Podane kompresje mogą być kumulowane, co prowadzi do porównywalnie wysokich dokładności bez tak dużej złożoności. Wizualizacje pokazują, że tylko przy wysokich współczynnikach kompresji znaczące gradienty CNN zmieniają się znacząco, a wraz z nimi dokładność. Pomimo satysfakcjonujących wyników, obecnie słabe wsparcie narzędziowe, szczególnie w przypadku hiperspektralnym, jest prawdopodobnie najważniejszą przeszkodą w stosowaniu pruningu i kwantyzacji na skalę przemysłową.</p>\n" +
            "                    <img src=\"static/img/Projects/MasterThesis/master5.png\"><img src=\"static/img/Projects/MasterThesis/master7.png\">\n" +
            "                    <p>Ta praca magisterska pozwala na mniej informacji wystarczających do rozpoznania obrazu, które musiałyby zostać przesłane na Ziemię np. z satelity. Jednocześnie, szybka klasyfikacja obrazów na urządzeniach mobilnych staje się łatwiejsza, ponieważ sieci neuronowe mogą być reprezentowane w bardziej zwarty sposób, czasem nawet z poprawą dokładności. Wyniki tej pracy są dostępne tutaj: https://github.com/daniel-rychlewski/hsi-toolbox</p>\n" +
            "                    <p><b>Technologie użyte:</b> PyTorch, DeepHyperX, Intel Distiller, Anaconda Python, Pandas, Torch (Lua), visdom, scikit-learn, JSON, PyCharm</p>";

        document.getElementById("planes-text").innerHTML =
            "                    <p>W tym projekcie używam skompresowanych sieci neuronowych splotowych do klasyfikacji samolotów (dwie klasy: samolot? tak / nie) na obrazach satelitarnych RGB. Wynika to z obserwacji, że CNNy dobrze nadają się do rozpoznawania obrazów. Jednak zajmują dużo miejsca, które chciałbym zmniejszyć poprzez kompresję. Mówiąc dokładniej, stosuję metodę parameter pruning z opcjonalną kwantyzacją wektorów po tym. W ten sposób obserwuję, jak zmieniły się również odpowiednie parametry, takie jak użycie pamięci i czas wnioskowania (inference time). Przed zastosowaniem kompresji ustalam dobre parametry podstawowe dla liczby epok (epochs) i wielkości partii (batch size).</p>\n" +
            "                    <p>Technicznie rzecz biorąc, wybrałem dobrze działający model Keras i iteracyjnie przyciąłem go za pomocą keras-surgeon, który uwzględnia kryterium średniej wartości procentowej zer. Kwantyzacja wag od 32-bitowych do 8-bitowych realizowana jest za pomocą konwertera Keras.</p>\n" +
            "                    <p>Mały rozmiar partii oznaczał wyższą dokładność klasyfikacji, ale możliwe, że więcej wahań. Przycinanie parametrów nie tylko zmniejsza rozmiar modelu, ale nawet do 80 procent zwiększa dokładność klasyfikacji. Jednak w przypadku dodatkowej kwantyzacji dokładności sprawdzania poprawności mają nieprzewidywalne wartości odstające. Zarówno rozmiar modelu, jak i czas wnioskowania zmniejszają się liniowo wraz ze wzrostem procentu przycinania.</p>\n" +
            "                    <img src=\"static/img/Projects/Planesnet/3_model_summary.png\">\n" +
            "                    <p><b>Technologie użyte:</b> Keras, keras-surgeon, TensorFlow, TensorFlow-Lite, Python, Jupyter Notebook, Matplotlib, PyCharm</p>";

        document.getElementById("website-text").innerHTML =
            "                    <p>Aby pochwalić się moimi projektami i promować się na rynku potencjalnych partnerów do współpracy, dostosowałem szablon za pomocą Bootstrap 4, jQuery, HTML i CSS.</p>\n" +
            "                    <p>Internacjonalizacja i responsywność tej jednostronicowej aplikacji znalazły się w centrum mojej agendy. W poprzednim punkcie, stati18n i później, zastosowano JS (tylko JS mógł internacjonalizować tekst z dołączonymi znacznikami HTML bez podziałów linii ze względu na sposób działania stati18n). Dostosowania kolorów dokonano za pomocą Koali. Każdy projekt otworzyłem w oknie modalnym z odpowiednimi linkami, opisami i obrazami. Jeśli chodzi o hosting tej strony statycznej, używam GitHub Pages i Netlify.</p>\n" +
            "                    <p>Dzięki temu mogę prezentować swoje umiejętności i zainteresowania tak, jak chcę, bez konieczności polegania np. na predefiniowanej strukturze LinkedIn. Bardzo się cieszę, że projekty, które miałem pasję i szanse na realizację, nie zostały zapomniane lub po prostu zostały sformułowane w jednym wierszu w moim życiorysie z powodu ograniczeń przestrzennych. Osoby rekrutujące mogą zobaczyć wszelkie szczegóły mojej prezentacji, które przykuwają ich uwagę, odwiedzić odpowiednie strony na moim GitHubie, pobrać pomiary i wypróbować moje programy. Wszelkie dane, które chętnie podam, można uzyskać za pośrednictwem formularza kontaktowego. Chociaż myśl, że ktoś uzna mój projekt za interesujący i być może na nim oparł, już mnie cieszy, mam nadzieję, że ta strona internetowa pokazuje moją pasję i determinację w inżynierii oprogramowania 😀</p>\n" +
            "                    <p><b>Technologie użyte:</b> Bootstrap, HTML, CSS, JavaScript, jQuery, WebStorm, Koala, stati18n, Netlify, GitHub Pages</p>";

        document.getElementById("talentshow-text").innerHTML =
            "                    <p>Wieczór Społeczny jest wydarzeniem Liceum Humboldta, w którym mogą wziąć udział zarówno uczniowie, jak i nauczyciele, rejestrując występy, które zamierzają zaprezentować podczas Wieczoru Społecznego.\n" +
            "                        Odpowiedni interfejs internetowy, który został opracowany w czwartym semestrze zaawansowanego kursu informatyki w roku szkolnym 2013/14 w grupie, umożliwia rejestrację kont użytkowników \n" +
            "                        oraz ich weryfikację za pomocą e-maila aktywacyjnego, rejestracja występów za pomocą odpowiedniego konta użytkownika oraz edytowanie i usuwanie danych o wydajności wstawionych przez siebie.</p>\n" +
            "                    <p>Administratorzy mogą ustawić kolejność aktów w osobnym widoku. Mogą zezwalać i blokować akty, wykonywać dowolne polecenia SQL, ustawiać długość przerwy, datę następnego wieczoru towarzyskiego i ostateczną datę, do której akty mogą zostać zarejestrowane. \n" +
            "                        Formularze kontaktowe umożliwiają łatwą komunikację między administratorem a użytkownikami, a także zaangażowanie niezbędne do pomyślnego zaplanowania takiego wydarzenia. Zarządzanie prawami użytkownika zapobiega działaniom, których użytkownicy nie mogą wykonywać.\n" +
            "                        Rejestracja obejmuje sprawdzenie bezpieczeństwa hasła za pomocą JavaScript. Ponadto captcha musi zostać rozwiązany po nieudanej próbie logowania.\n" +
            "                        Oprogramowanie można zainstalować za pomocą skryptu powłoki, który kopiuje strukturę bazy danych z pliku i kopiuje pliki do katalogu zdefiniowanego przez użytkownika.</p>\n" +
            "                    <p><b>Technologie użyte:</b> PHP, MySQL, CSS, HTML, JavaScript, shell scripting, phpMyAdmin, gedit</p>\n" +
            "                    <img src=\"static/img/Projects/BunterAbend/bunterabend.png\">";

        document.getElementById("pacman-text").innerHTML =
            "                    <p>W ramach projektu grupowego w drugim semestrze zaawansowanego kursu informatyki w roku szkolnym 2012/13 w Java Swing zaimplementowano słynną grę Pacman z wykorzystaniem paradygmatu MVC.</p>\n" +
            "                    <p>Zadaniem gracza jest zebranie wszystkich kul na polu, aby przejść do następnego poziomu, w którym wszystkie obiekty poruszają się szybciej niż na poprzednim poziomie. Może zbierać duże kule, przez co duchy są tymczasowo bezbronne, a także sporadycznie pojawiające się owoce na środku pola, które dodatkowo zwiększają wynik gracza. Za każdym razem, gdy gracz traci życie, co dzieje się, gdy duch dotyka Pacmana, aktualny wynik jest wyświetlany na konsoli. Gra kończy się, gdy wszystkie trzy życia zostaną utracone.</p>\n" +
            "                    <p>Niestety z powodu problemów z prawem autorskim nie mogę publicznie udostępnić tego projektu tutaj. Jeśli jesteś zainteresowany, skontaktuj się ze mną za pomocą formularza kontaktowego.</p>\n" +
            "                    <p><b>Technologie użyte:</b> Java Swing, SVN, BlueJ with team collaboration tools</p>\n" +
            "                    <img src=\"static/img/Projects/Pacman/pacman.png\">";

        document.getElementById("rumble-text").innerHTML =
            "<p>Pokemon Rumble Rush to mobilna gra o odkrywaniu etapów łapania pokemonów. Niestety proces grania na scenie jest bardzo powtarzalny, szczególnie jeśli chodzi o zbieranie rzadkiego pokemona pięciogwiazdkowymi atakami.</p>\n" +
            "<p>Na szczęście sterowanie grą jest tak podstawowe, że mogłem z łatwością zastosować techniki automatyzacji, aby pomóc. Pokemon może być wyposażony w sprzęt, którego siła jest przechowywana w pamięci RAM. W związku z tym, aby wzmocnić atak sprzętu, użyłem manipulacji pamięcią RAM w GameGuardian, szukając początkowej wartości CP, zmieniając wyposażenie, ponownie szukając i zmieniając wartość. W ten sposób boss może zostać pokonany już po jednym ataku ekwipunku.</p>" +
            "<p>Aby przejść dalej, znalezienie odpowiednich etapów z dokumentu Dokumentów Google, w którym publikowane są lokalizacje etapów, jest trudne ze względu na potrzebę precyzyjnego celowania. Dlatego skorzystałem z opcji ułatwień dostępu w Androidzie, aby powiększyć. W razie potrzeby Grid-Wichterle dostarczył siatkę jako punkt odniesienia w trudnych sytuacjach (np. etap wody, gdzie nie ma innych odniesień w okolicy). Ułatwiło to uzyskanie pożądanych etapów.</p>\n" +
            "<p>Co najważniejsze, automatyzacja pokonania etapu odbywa się za pomocą makr QuickTouch. W konfigurowalnych opóźnieniach i powtórzeniach sekwencji dotykowych i slajdów, określiłem makra dla kilku przypadków użycia, które pozwalają na grę bez udziału użytkownika przez nieograniczony czas, dopóki bateria się nie wyczerpie, telefon nie przegrzewa się, a połączenie internetowe działa. Przykłady przypadków użycia to kilkukrotne pokonanie całego etapu wszystkimi pokemonami (pospolity, nietypowy, sub-boss, boss), hodowanie tylko bossów i sub-bossów, ukończenie codziennego wyzwania szczytu monet, wybranie pokemona i pokonanie bossów w celu uzyskania wyższego CP pokemon na wyspie.</p>\n" +
            "<p>W rezultacie pokemony można hodować, a etapy i bossów łatwo pokonać. To, co inaczej byłoby szalenie nudną i powtarzalną grą, zamieniło się w zabawne doświadczenie. Niezależnie od tego gra ma zostać zamknięta w lipcu 2020 r. Aby uzyskać informacje na temat działania makr, zapoznaj się z linkiem u góry.</p>\n" +
            "<p><b>Technologie użyte:</b> QuickTouch - Automatic Clicker, GameGuardian, Grid-Wichterle, Android accessibility options, Google Docs, Pokemon Rumble Rush</p>\n" +
            "<img src=\"static/img/Projects/RumbleRush/stats.jpg\">";

        document.getElementById("pinboard-text").innerHTML =
            "                    <p>Wdrożenie internetowej tablicy z pierwszym semestrem zaawansowanego kursu informatyki umożliwia rejestrację użytkowników do pisania postów na tablicy, przy czym najnowszy post jest pokazany na samej górze.</p>\n" +
            "                    <p>Po potwierdzeniu konta za pomocą linku aktywacyjnego w wiadomości e-mail użytkownicy mogą tworzyć, aktualizować i usuwać własne posty. Moderatorzy mogą zatwierdzać i blokować posty, ponieważ użytkownicy z normalnymi uprawnieniami mogą widzieć tylko własne posty oraz posty zatwierdzone. Ponadto administratorzy mogą zarządzać kontami użytkowników w tabeli zarządzania, w której mogą zmieniać dane użytkowników, a także usuwać i tworzyć konta użytkowników. Aby zapobiec spamowi, rejestracja obejmuje captcha, który jest również wyświetlany i musi zostać rozwiązany po każdej nieudanej próbie logowania.</p>\n" +
            "                    <p><b>Technologie użyte:</b> PHP, MySQL, CSS, HTML, phpMyAdmin, gedit</p>\n" +
            "                    <img src=\"static/img/Projects/Pinnwand/pinnwand.png\">";

        document.getElementById("lostinspace-text").innerHTML =
            "                    <p>Minigra „Lost in Space” została stworzona jako projekt na kursie informatyki w roku szkolnym 2011/12 w 10. klasie. Gracz ma za zadanie poruszać się po rakiecie w górę iw dół za pomocą klawiszy strzałek, aby zbierać gwiazdy i emotikony, ale unikać innych obiektów, aby pokonać ostatecznych bossów za pomocą lasera na trzech różnych etapach, różniących się poziomem trudności.</p>\n" +
            "                    <p>Trudność zwiększa się dzięki większej prędkości i większej liczbie obiektów zbliżających się do rakiety, które są odradzane po prawej stronie i jednocześnie przesuwają się w lewo. Innymi czynnikami są różne kierunki ruchu i prędkości obiektów, a także liczba wrogich laserów wystrzelonych jednocześnie przez końcowego bossa, której rakieta musi unikać, fakt, że aby wystrzelić własny laser, buźka musi udzielić pozwolenia zbierane i dodatkowe tarcze ostatnich bossów. Temat przestrzeni zaakcentowany jest odpowiednią muzyką i efektami dźwiękowymi. Gra kończy się, gdy wrogi obiekt uderzy w rakietę lub gracz ukończy wszystkie trzy poziomy.\n" +
            "                        Statystyki są wyświetlane w obu przypadkach na końcu, w tym całkowity wynik, który jest obliczany na podstawie liczby unikanych wrogich obiektów i brakujących gwiazd.</p>\n" +
            "                    <i>Jak grać:</i>\n" +
            "                        <ul><li>Użyj klawiszy strzałek lub w / s, aby poruszać się w górę / w dół, przytrzymaj Shift, aby poruszać się wolniej, naciśnij spację dla lasera</li>\n" +
            "                        <li>Celuj w środek bossa</li>\n" +
            "                        <li>Zbieraj gwiazdki i emotikony, unikaj asteroid</li>\n" +
            "                        <li>Zbierz wystarczającą liczbę gwiazdek, aby pojawili się bossowie</li>\n" +
            "                        <li>Zbierz buźki, aby móc ponownie wystrzelić laser</li>\n" +
            "                        <li>Uruchom grę za pomocą \„java -jar Lost_In_Space.jar\”</li></ul>\n" +
            "                    <p><b>Technologie użyte:</b> Java, Greenfoot</p>\n" +
            "                    <img src=\"static/img/Projects/LostInSpace/lostinspace1.png\">\n" +
            "                    <img src=\"static/img/Projects/LostInSpace/lostinspace2.png\">" +
            "                        <p class='small'>Informacje o prawach autorskich:\n" +
            "                        Użyto obrazu pingwina autorstwa lewing@isc.tamu.edu Larry Ewing i The GIMP (https://de.wikipedia.org/wiki/Datei:NewTux.svg)<br>" +
            "                        Muzyka: Y&V - Lune (https://www.youtube.com/watch?v=n79aphwhpW0)\n</p>";

        document.getElementById("hackathon-text").innerHTML =
            "                    <p>Podczas Hackathonu Microsoft 2019 w Berlinie pod hasłem „Popraw swoje życie studenckie”, mój zespół wybrał pomysł platformy edukacyjnej wspomaganej sztuczną inteligencją do generowania kart, która umożliwia współpracę studentów przygotowujących się do egzaminu.</p>\n" +
            "                    <p>Aby przejść do szczegółów, pierwszym krokiem jest generacja kartami, która pozwala na wprowadzanie plików PDF / Dokument, Audio / Głos (za pomocą mowy na tekst) i wprowadzanie dowolnych formularzy. Dlatego narzędzie idealnie byłoby w stanie wygenerować fiszki z notatek z wykładów, slajdów i dużych podsumowań wykładów w formacie PDF, które często otrzymują studenci.</p>\n" +
            "                    <p>Po utworzeniu wszystkich kart można rozpocząć sesję uczenia się. Możliwe jest okresowe planowanie takiej sesji w oparciu o czas pozostały do​egzaminu i żądaną częstotliwość interwału. W tym drugim przypadku uczeń otrzymuje przypomnienia programu Outlook, aby ponownie wypróbował pytania, gdy nadejdzie czas, aby to zrobić. Kandydat widzi kategorie, w których pogrupowane są pytania z kartami, w tym określone słowa kluczowe i pytania, które w przeszłości były błędne / błędne. Po wybraniu pytania kandydat może przesłać odpowiedź za pomocą dowolnego tekstu, głosu lub wideo. AI platformy Azure ocenia poprawność odpowiedzi za pomocą słów kluczowych, które z niej wyodrębnia. Dodatkowe informacje dotyczące pytania i odpowiedzi można wyświetlić za pomocą usługi Azure Bing Search.</p>\n" +
            "                    <p>Aby zrealizować podejście oparte na społeczności, użytkownik jest dopasowywany do innych członków społeczności na podstawie jego wyniku, wykładu / tematu i wskaźnika powodzenia karty flash. Dzięki takiemu podejściu możliwe jest nie tylko spersonalizowane uczenie się, ale także uczniowie mogą wymieniać się pomysłami, aby utalentowana osoba w jednym obszarze mogła uczyć się od eksperta w innym.</p>\n" +
            "                    <p>Technicznie rzecz biorąc, Azure Functions było dobrym wyborem dla kodu bezserwerowego, ponieważ mój zespół mógł budować funkcje, które można łatwo włączyć do Power App. Podsumowując, aplikacja typu bare-bone, którą zbudowaliśmy w ograniczonym czasie wynoszącym zaledwie 24 godziny, pozwoliła nam przedstawić publiczności naszą koncepcję techniczną i biznesową oraz przygotować grunt pod dalszy rozwój.</p>\n" +
            "                    <p><b>Technologie użyte:</b> Azure Cognitive Services: Text Analytics, Speech to Text, Bing Search; Azure MS SQL, Functions, C#, Blob Storage, Power Platform: PowerApps, Microsoft Flow</p>\n" +
            "                    <img src=\"static/img/Projects/Hackathon/hackathon1.jpg\">\n" +
            "                    <img src=\"static/img/Projects/Hackathon/hackathon2.jpg\">\n" +
            "                    <img src=\"static/img/Projects/Hackathon/concept.png\">";

        document.getElementById("wurzelimperium-text").innerHTML =
            "<p>Zielone imperium to gra polegająca na sadzeniu, podlewaniu i zbieraniu owoców i warzyw w różnych ogrodach, które są dostępne dla gracza. Aby to zrobić, powinien kliknąć na każde pole ogrodu o wielkości 17 * 12 pól, przy czym istnieją warianty, takie jak ogród wodny, oraz niektóre inne cechy gry, takie jak gildie, zawody, ogrody kaktusów itp., które nie mają tutaj znaczenia. Oczywiście klikanie pól staje się bardzo nudne. Ponadto postęp w grze jest bardzo wolny. Istnieje jednak waluta premium o nazwie monety. Moneta jest warta dziesiątki tysięcy root talarów (waluta w grze) na rynku w grze. Można zdobyć te monety patrząc na reklamę, ale według mojej analizy ten system reklamowy jest technicznie wadliwy, tak że wdrożony przez mnie dowód koncepcji może potencjalnie wygenerować nieskończoną liczbę monet, rzekomo patrząc na reklamę.</p>" +
            "<p>Aby naprawić potrzebę powtarzania kliknięć, użyłem rejestratora KraTronic i ReMouse dla makr, przy czym ta ostatnia opcja była szybsza. Makra mogą być rejestrowane lub generowane przez moje narzędzie Java. Upraszcza to sadzenie i podlewanie warzyw i stanowi dobrą podstawę do planowania makr za pomocą crona lub narzędzia do planowania zadań systemu Windows. Planowanie makr na zdalnych komputerach lub serwerze NAS może być szczególnie przydatne w przypadku wydarzeń, w których należy zbierać i sadzić warzywa co około 6 godzin.</p>" +
            "<p>Ponadto oglądanie reklam umożliwia szybsze postępy w grze. Jednak zamiast widzieć je na maszynach wirtualnych, na których obsługa reklam jest zautomatyzowana za pomocą makr, żądania (np. z Fiddlerem) mogą być odtwarzane dla tego samego efektu. Zasadniczo trzeba wygenerować tokena i użyć go jako parametr oddzwaniania, jak pokazuje mój film na YouTube. Aby uprościć pracę, napisałem program Java, za pomocą którego można zautomatyzować odtwarzanie żądań. Za pomocą tego narzędzia Java można także wyświetlać reklamy z kina samochodowego (wydarzenie w grze), wymieniać monety i ukończyć niekończącą się serię zadań. Są to misje, które można wykonać tylko w określonym miejscu, do którego można przejść w środy i soboty w grze, ale dzięki niepoprawnemu programowaniu mogę ominąć to ograniczenie lokalizacji i wykonać zadanie co 24 godziny.</p>"+
            "<p>Projekty IntelliJ nie zostały stworzone z myślą o czystym kodzie, ponieważ celem nie było stworzenie oprogramowania, które można utrzymywać dla klienta, ale uruchomienie programu tak szybko, jak to możliwe, tylko dla mnie. Z powodu mojej automatyzacji gracz w tej wyjątkowo powolnej grze może szybko iść do przodu (kto wie, kiedy serwery gry zostaną wyłączone), co sprawia, że gra teraz jest rzeczywiście zabawna.</p>"+
            "<p><b>Technologie użyte:</b> ReMouse Standard, rejestrator myszy i kluczy Kra-Tronic, Windows i Synology Task Planner, Fiddler, Wireshark, Java 8 (HttpURLConnection, Streams, IO)</p>";

        document.getElementById("hateblock-text").innerHTML =
            "<p>Chcesz się dowiedzieć, czy fragment tekstu, który widzisz na stronie internetowej w przeglądarce Chrome, jest obraźliwy? To rozszerzenie obejmuje model głębokiego uczenia, który działa na Twoim komputerze, który może potwierdzić lub obalić Twoje przeczucie, że tekst jest (wysoce) toksyczny, stanowi zagrożenie, ma charakter jednoznacznie seksualny, obsceniczny, zniewaga lub atakuje tożsamość. W ten sposób możesz sprawdzić, czy to tylko Twoja opinia, czy też tekst rzeczywiście nienawidzi. Poza tym celem tej aplikacji jest eksperymentowanie z Tensorflow.js, aby każdy mógł zobaczyć, co może zrobić wbudowany model głębokiego uczenia oparty na Universal Sentence Encoder bez konieczności rozumienia czegokolwiek na temat sztucznej inteligencji. Klasyfikacja działa tylko w przypadku tekstów w języku angielskim i uwzględnia siedem wymienionych powyżej kategorii.</p>\n" +
            "<p>Jak to działa: kliknij prawym przyciskiem myszy zaznaczenie tekstu i wybierz „Analyze for hate” (= Analizuj pod kątem nienawiści). To powoduje wnioskowanie z modelu, który jest przykładem wykrywania toksyczności tekstu dostępnym dla TensorFlow.js. Po zakończeniu wnioskowania (co może potrwać do kilku sekund) tekst jest podświetlany kolorem, w zależności od tego, czy typ nienawiści lub jego brak został rozpoznany, czy też wynik nie jest jasny. Przesuń wskaźnik myszy nad podświetlony tekst, aby dowiedzieć się, która z siedmiu kategorii została rozpoznana, z których jedna służy do wyróżniania. W wyskakującym menu dodatku użytkownik może dostosować, które z siedmiu kryteriów model ma stosować do analizy. Po prostu kliknij ikonę rozszerzenia, wybierz żądaną opcję z menu rozwijanego i zapisz zmiany za pomocą przycisku Zapisz. Tutaj możesz również dostosować trzy kolory używane do podświetlania.</p>\n" +
            "<p>Więcej informacji można znaleźć na <a target='_blank' href='https://github.com/daniel-rychlewski/hateblock'>stronie Github</a>.</p>\n" +
            "<p><b>Technologie użyte:</b> TensorFlow.js, WebStorm, JavaScript, Chrome API (Popup-Seite und Kontextmenü), DOM API</p>\n" +
            "<img src=\"static/img/Projects/HateBlock/hateblock1.png\">\n" +
            "<img src=\"static/img/Projects/HateBlock/hateblock2.png\">";

        document.getElementById("start-description-1").innerHTML = "Jestem inżynierem oprogramowania z doświadczeniem w różnych projektach typu full-stack.";
        document.getElementById("start-description-2").innerHTML = "Jeżeli znajdziecie Państwo coś interesującego, proszę o <a href=\"#contact\">kontakt</a>! Nie mogę się doczekać nowych szans i współpracy z Tobą.";
        document.getElementById("start-description-3").innerHTML = "Wszystkie <a href=\"#work\">projekty</a>, które znajdziesz na tej stronie, są wykonane przeze mnie.";

        document.getElementById("role-1").innerHTML = "Inżynier oprogramowania full-stack";
        document.getElementById("role-2").innerHTML = "Programista backend";

        document.getElementById("onevshundred-heading").innerHTML = "1 kontra 100";
        document.getElementById("onevshundred-subtitle").innerHTML = "Narzędzie uczestnictwa w konkursie";
        document.getElementById("autoloop-heading").innerHTML = "Stop AutoLoop";
        document.getElementById("autoloop-subtitle").innerHTML = "Zatrzymaj automatyczne odtwarzanie tych samych filmów";
        document.getElementById("filterlist-heading").innerHTML = "Narzędzie do generowania listy filtrów";
        document.getElementById("filterlist-subtitle").innerHTML = "Prywatność a użyteczność inteligentnych telewizorów";
        document.getElementById("pokerbot-heading").innerHTML = "Texas Hold 'em Bot";
        document.getElementById("pokerbot-subtitle").innerHTML = "Graj w pokera przeciwko trudnej sztucznej inteligencji";
        document.getElementById("hyperspectral-heading").innerHTML = "Hiperspektralna klasyfikacja z sprężanymi sieciami neuronowymi CNN";
        document.getElementById("hyperspectral-subtitle").innerHTML = "Zmniejszone wymiary obrazu i modelu";
        document.getElementById("planes-heading").innerHTML = "Rozpoznawanie samolotów w obrazach satelitarnych ze skompresowanymi CNNami";
        document.getElementById("planes-subtitle").innerHTML = "Prawa autorskie do zdjęć: CC-BY-SA rhammell https://www.kaggle.com/rhammell/planesnet";
        document.getElementById("website-heading").innerHTML = "www.danielrychlewski.com";
        document.getElementById("website-subtitle").innerHTML = "Moja własna strona internetowa";
        document.getElementById("talentshow-heading").innerHTML = "Zarządzanie talentami";
        document.getElementById("talentshow-subtitle").innerHTML = "Zarejestruj się i planuj akty online";
        document.getElementById("pacman-heading").innerHTML = "Pacman w Javie";
        document.getElementById("pacman-subtitle").innerHTML = "Implementacja gry MVC";
        document.getElementById("rumble-rush-heading").innerHTML = "Pokemon Rumble Rush";
        document.getElementById("rumble-rush-subtitle").innerHTML = "Automatyzacja gier mobilnych za pomocą makr";
        document.getElementById("pinboard-heading").innerHTML = "Tablica internetowa";
        document.getElementById("pinboard-subtitle").innerHTML = "Aplikacja CRUD z kontrolkami RBAC";
        document.getElementById("lostinspace-heading").innerHTML = "Lost in Space";
        document.getElementById("lostinspace-subtitle").innerHTML = "Eksploruj wszechświat za pomocą rakiety!";

        document.getElementById("onevshundred-modal-heading").innerHTML = "1 kontra 100";
        document.getElementById("autoloop-modal-heading").innerHTML = "Stop AutoLoop";
        document.getElementById("filterlist-modal-heading").innerHTML = "Generator listy filtru dla LG 42LM670S-ZA";
        document.getElementById("pokerbot-modal-heading").innerHTML = "Bot do grania w Texas Hold'em";
        document.getElementById("pokerbot-modal-play").innerHTML = "Graj!";
        document.getElementById("hyperspectral-modal-heading").innerHTML = "Hiperspektralna klasyfikacja zdjęć satelitarnych używając sprężanych sieci neuronowych";
        document.getElementById("planes-modal-heading").innerHTML = "Analiza technik kompresji modelów \"parameter pruning\" i \"vector quantization\" dla Convolutional Neural Networks na przykladzie zdjęć satelitarnych";
        document.getElementById("planes-modal-download").innerHTML = "Pobierz moje pomiary";
        document.getElementById("planes-modal-github").innerHTML = "Zobacz na GitHubie";
        document.getElementById("wurzelimperium-modal-github").innerHTML = "Zobacz na GitHubie";
        document.getElementById("website-modal-heading").innerHTML = "Moja strona internetowa";
        document.getElementById("talentshow-modal-heading").innerHTML = "Zarządzanie talent show";
        document.getElementById("pacman-modal-heading").innerHTML = "Pacman w Javie";
        document.getElementById("rumble-modal-heading").innerHTML = "Pokemon Rumble Rush";
        document.getElementById("rumble-modal-download").innerHTML = "Pobierz zrzuty ekranu";
        document.getElementById("rumble-modal-see").innerHTML = "Prezentacja wideo";
        document.getElementById("wurzelimperium-modal-see").innerHTML = "Prezentacja wideo";
        document.getElementById("pinboard-modal-heading").innerHTML = "Tablica korkowa online";
        document.getElementById("lostinspace-modal-heading").innerHTML = "Lost in Space";
        document.getElementById("lostinspace-modal-playdownload").innerHTML = "Pobierz i graj!";
        document.getElementById("skills-modal-heading").innerHTML = "Umiejętności";
        document.getElementById("hackathon-modal-heading").innerHTML = "Flashcard generation for exam preparation";
        document.getElementById("hackathon-heading").innerHTML = "Microsoft Hackathon 2019";
        document.getElementById("hackathon-subtitle").innerHTML = "Enhance Your Student Life";
        document.getElementById("wurzelimperium-heading").innerHTML = "Zielone Imperium";
        document.getElementById("wurzelimperium-subtitle").innerHTML = "Automatyzacja przez makra i planowanie zadań";
        document.getElementById("wurzelimperium-modal-heading").innerHTML = "Zielone Imperium";
        document.getElementById("hateblock-heading").innerHTML = "Hate Block";
        document.getElementById("hateblock-subtitle").innerHTML = "Wykrywanie nienawiści po stronie klienta za pomocą uniwersalnego kodera zdań";
        document.getElementById("hateblock-modal-heading").innerHTML = "Hate Block";

        let close = "Zamknij";
        document.getElementById("skills-close").innerHTML = close;
        document.getElementById("onevshundred-close").innerHTML = close;
        document.getElementById("autoloop-close").innerHTML = close;
        document.getElementById("filterlist-close").innerHTML = close;
        document.getElementById("pokerbot-close").innerHTML = close;
        document.getElementById("hyperspectral-close").innerHTML = close;
        document.getElementById("planes-close").innerHTML = close;
        document.getElementById("website-close").innerHTML = close;
        document.getElementById("talentshow-close").innerHTML = close;
        document.getElementById("pacman-close").innerHTML = close;
        document.getElementById("rumble-close").innerHTML = close;
        document.getElementById("pinboard-close").innerHTML = close;
        document.getElementById("lostinspace-close").innerHTML = close;
        document.getElementById("hackathon-close").innerHTML = close;
        document.getElementById("imprint-close").innerHTML = close;
        document.getElementById("privacy-close").innerHTML = close;
        document.getElementById("wurzelimperium-close").innerHTML = close;
        document.getElementById("hateblock-close").innerHTML = close;

        document.getElementById("imprint-link").innerHTML = "Uwaga prawna (po niemiecku)";
        document.getElementById("privacy-link").innerHTML = "Prywatność (po niemiecku)";
        document.getElementById("privacy-heading").innerHTML = "Polityka prywatności";

        document.getElementById("skillSearch").placeholder = "Szukaj umiejętności";
    }

    document.getElementById("skills-text").innerHTML = generateCSVSkills();
    document.getElementById("try-visualization").innerHTML = tryVisualization()[language];
    document.getElementById("try-image-processing").innerHTML = tryImageProcessing()[language];
    document.getElementById("contact-me").onclick = function() { openEmail(language) };

    document.getElementById("imprint-heading").innerHTML = "Impressum";
    document.getElementById("imprint-text").innerHTML =
        atob("PGg1PktvbnRha3RhZHJlc3NlPC9oNT48cD5EYW5pZWwgUnljaGxld3NraTxicj5Ib2hsc3RyYXNzZSA3MTI8YnI+ODA0OCBa/HJpY2g8YnI+U2Nod2Vpejxicj5kYW5pZWwucnljaGxld3NraS4xOTk3QGdtYWlsLmNvbTxicj4rNDEgNzkyNSA4MDAxIDEyODQ8L3A+") +
        "\n" +
        "<h5>Vertretungsberechtigte Personen</h5>\n" +
        "<p>Daniel Rychlewski, Inhaber der Webseite</p>\n" +
        "\n" +
        "<h5>Haftungsausschluss</h5>\n" +
        "<p>Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen. Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.</p>\n" +
        "\n" +
        "<h5>Haftung für Links</h5>\n" +
        "<p>Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.</p>\n" +
        "\n" +
        "<h5>Urheberrechte</h5>\n" +
        "<p>Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich der Firma Daniel Rychlewski oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.</p>\n" +
        "\n" +
        "<h5>Quelle</h5>\n" +
        "<p>Dieses Impressum wurde am 02.06.2020 mit dem Impressum-Generator von <a href='https://webkoenig.ch/' target='_blank'>Webkönig</a> erstellt und von Daniel Rychlewski passend abgeändert. Die Agentur Webkönig übernimmt keine Haftung.</p>";

    document.getElementById('privacy-text').innerHTML =
        "<p>Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:</p>" +
        atob("PHA+RGFuaWVsIFJ5Y2hsZXdza2k8YnIvPkhvaGxzdHJhc3NlIDcxMjxici8+ODA0OCBa/HJpY2g8L3A+PHA+VGVsZWZvbjogKzQxIDc5MjUgODAwMSAxMjg0PGJyLz5FLU1haWw6IGRhbmllbC5yeWNobGV3c2tpLjE5OTdAZ21haWwuY29tPGJyLz5XZWJzZWl0ZTogaHR0cDovL3d3dy5kYW5pZWxyeWNobGV3c2tpLmNvbS8gPC9wPg==") +
        "<h5>Allgemeiner Hinweis</h5> <p>Gest&uuml;tzt auf Artikel 13 der schweizerischen Bundesverfassung und den datenschutzrechtlichen Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer Privatsph&auml;re sowie auf Schutz vor Missbrauch ihrer pers&ouml;nlichen Daten. Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerkl&auml;rung.</p>" +
        "<p>In Zusammenarbeit mit unseren Hosting-Providern bem&uuml;hen wir uns, die Datenbanken so gut wie m&ouml;glich vor fremden Zugriffen, Verlusten, Missbrauch oder vor F&auml;lschung zu sch&uuml;tzen.</p>" +
        "<p>Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken aufweisen kann. Ein l&uuml;ckenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht m&ouml;glich.</p>" +
        "<p>Durch die Nutzung dieser Website erkl&auml;ren Sie sich mit der Erhebung, Verarbeitung und Nutzung von Daten gem&auml;ss der nachfolgenden Beschreibung einverstanden. Diese Website kann grunds&auml;tzlich ohne Registrierung besucht werden. Dabei werden Daten wie beispielsweise aufgerufene Seiten bzw. Namen der abgerufenen Datei, Datum und Uhrzeit zu statistischen Zwecken auf dem Server gespeichert, ohne dass diese Daten unmittelbar auf Ihre Person bezogen werden. Personenbezogene Daten, insbesondere Name, Adresse oder E-Mail-Adresse werden soweit m&ouml;glich auf freiwilliger Basis erhoben. Ohne Ihre Einwilligung erfolgt keine Weitergabe der Daten an Dritte.</p>" +
        "<h5>Datenschutzerkl&auml;rung f&uuml;r Cookies</h5><p>Diese Website verwendet Cookies. Das sind kleine Textdateien, die es m&ouml;glich machen, auf dem Endger&auml;t des Nutzers spezifische, auf den Nutzer bezogene Informationen zu speichern, w&auml;hrend er die Website nutzt. Cookies erm&ouml;glichen es, insbesondere Nutzungsh&auml;ufigkeit und Nutzeranzahl der Seiten zu ermitteln, Verhaltensweisen der Seitennutzung zu analysieren, aber auch unser Angebot kundenfreundlicher zu gestalten. Cookies bleiben &uuml;ber das Ende einer Browser-Sitzung gespeichert und k&ouml;nnen bei einem erneuten Seitenbesuch wieder aufgerufen werden. Wenn Sie das nicht w&uuml;nschen, sollten Sie Ihren Internetbrowser so einstellen, dass er die Annahme von Cookies verweigert.</p>" +
        "<p>Ein genereller Widerspruch gegen den Einsatz der zu Zwecken des Onlinemarketing eingesetzten Cookies kann bei einer Vielzahl der Dienste, vor allem im Fall des Trackings, über die US-amerikanische Seite <a href=\"http://www.aboutads.info/choices/\" target=\"_blank\" rel=\"noopener\">http://www.aboutads.info/choices/</a> oder die EU-Seite <a href=\"http://www.youronlinechoices.com/\" target=\"_blank\" rel=\"noopener\">http://www.youronlinechoices.com/</a> erklärt werden. Des Weiteren kann die Speicherung von Cookies mittels deren Abschaltung in den Einstellungen des Browsers erreicht werden. Bitte beachten Sie, dass dann gegebenenfalls nicht alle Funktionen dieses Onlineangebotes genutzt werden können.</p>" +
        "<h5>Datenschutzerkl&auml;rung f&uuml;r SSL-/TLS-Verschl&uuml;sselung</h5><p>Diese Website nutzt aus Gr&uuml;nden der Sicherheit und zum Schutz der &Uuml;bertragung vertraulicher Inhalte, wie zum Beispiel der Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL-/TLS-Verschl&uuml;sselung. Eine verschl&uuml;sselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>" +
        "<p>Wenn die SSL bzw. TLS Verschl&uuml;sselung aktiviert ist, k&ouml;nnen die Daten, die Sie an uns &uuml;bermitteln, nicht von Dritten mitgelesen werden.</p><h5>Daten&uuml;bertragungssicherheit (ohne SSL)</h5><p>Bitte beachten Sie, dass Daten, die &uuml;ber ein offenes Netz wie das Internet oder einen E-Mail-Dienst ohne SSL-Verschl&uuml;sselung &uuml;bermittelt werden, f&uuml;r jedermann einsehbar sind. Eine unverschl&uuml;sselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers &quot;http://&quot; anzeigt und kein Schloss-Symbol in Ihrer Browserzeile angezeigt wird. Informationen die &uuml;ber das Internet &uuml;bertragen werden und online empfangene Inhalte, k&ouml;nnen unter Umst&auml;nden &uuml;ber Netze von Drittanbietern &uuml;bermittelt werden. Wir k&ouml;nnen die Vertraulichkeit von Mitteilungen oder Unterlagen, die &uuml;ber solche offenen Netze oder Netze von Drittanbietern &uuml;bermittelt werden, nicht garantieren.</p>" +
        "<p>Wenn Sie &uuml;ber ein offenes Netz oder Netze von Drittanbietern personenbezogene Informationen bekannt geben, sollten Sie sich der Tatsache bewusst sein, dass Ihre Daten verloren gehen oder Dritte potenziell auf diese Informationen zugreifen und folglich die Daten ohne Ihre Zustimmung sammeln und nutzen k&ouml;nnen. Zwar werden in vielen F&auml;llen die einzelnen Datenpakete verschl&uuml;sselt &uuml;bermittelt, nicht aber die Namen des Absenders und des Empf&auml;ngers. Selbst wenn der Absender und der Empf&auml;nger im gleichen Land wohnen, erfolgt die Daten&uuml;bermittlung &uuml;ber solche Netze h&auml;ufig und ohne Kontrollen auch &uuml;ber Drittstaaten, d.h. auch &uuml;ber L&auml;nder, die nicht das gleiche Datenschutzniveau bieten wie Ihr Domizilland. Wir &uuml;bernehmen f&uuml;r die Sicherheit Ihrer Daten w&auml;hrend der &Uuml;bermittlung &uuml;ber das Internet keine Verantwortung und lehnen jede Haftung f&uuml;r mittelbare und unmittelbare Verluste ab. Wir bitten Sie, andere Kommunikationsmittel zu benutzen, sollten Sie dies aus Gr&uuml;nden der Sicherheit f&uuml;r notwendig oder vern&uuml;nftig erachten.</p>" +
        "<p>Trotz umfangreicher technischer und organisatorischer Sicherungsvorkehrungen, k&ouml;nnen m&ouml;glicherweise Daten verloren gehen oder von Unbefugten abgefangen und/oder manipuliert werden. Wir treffen soweit m&ouml;glich geeignete technische und organisatorische Sicherheitsmassnahmen, um dies innerhalb unseres Systems zu verhindern. Ihr Computer befindet sich indessen ausserhalb des von uns kontrollierbaren Sicherheitsbereichs. Es obliegt Ihnen als Benutzer, sich &uuml;ber die erforderlichen Sicherheitsvorkehrungen zu informieren und diesbez&uuml;glich geeignete Massnahmen zu treffen. Als Website-Betreiber haften wir keinesfalls f&uuml;r Sch&auml;den, die Ihnen aus Datenverlust oder -manipulation entstehen k&ouml;nnen.</p>" +
        "<p>Daten welche Sie in Online-Formularen angeben, k&ouml;nnen zwecks Auftragsabwicklung an beauftragte Dritte weitergegeben und von diesen eingesehen und allenfalls bearbeitet werden.</p><h5>&Auml;nderungen</h5><p>Wir k&ouml;nnen diese Datenschutzerkl&auml;rung jederzeit ohne Vorank&uuml;ndigung anpassen. Es gilt die jeweils aktuelle, auf unserer Website publizierte Fassung. Soweit die Datenschutzerkl&auml;rung Teil einer Vereinbarung mit Ihnen ist, werden wir Sie im Falle einer Aktualisierung über die &Auml;nderung per E-Mail oder auf andere geeignete Weise informieren.</p>" +
        "<h5>Fragen an den Datenschutzbeauftragten</h5> <p>Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die f&uuml;r den Datenschutz zu Beginn der Datenschutzerkl&auml;rung aufgef&uuml;hrten, verantwortlichen Person in unserer Organisation.</p>" +
        "<p>Z&uuml;rich, 02.06.2020</p><p class='small'>Quelle, die sehr unangenehm mit ihrem Datenschutz-Generator bzgl. Quellenangabe und aller eingeblendeten Warnungen gängelt, sodass ich sie überhaupt nicht empfehlen kann: <a href=\"https://www.swissanwalt.ch\" target=\"_blank\" rel=\"noopener\">SwissAnwalt</a></p>";
}

function enableLongtapForTitles() {
    $("#angular-title").longpress(function() {alert($(this).attr('title'));});
    $("#javascript-title").longpress(function() {alert($(this).attr('title'));});
    $("#cpp-title").longpress(function() {alert($(this).attr('title'));});
    $("#pytorch-title").longpress(function() {alert($(this).attr('title'));});
    $("#keras-title").longpress(function() {alert($(this).attr('title'));});
    $("#keras-surgeon-title").longpress(function() {alert($(this).attr('title'));});
    $("#tfjs-title").longpress(function() {alert($(this).attr('title'));});
    $("#tflite-title").longpress(function() {alert($(this).attr('title'));});
    $("#scikit-title").longpress(function() {alert($(this).attr('title'));});
    $("#pandas-title").longpress(function() {alert($(this).attr('title'));});
    $("#torch-title").longpress(function() {alert($(this).attr('title'));});
    $("#jupyter-title").longpress(function() {alert($(this).attr('title'));});
    $("#deephyperx-title").longpress(function() {alert($(this).attr('title'));});
    $("#visdom-title").longpress(function() {alert($(this).attr('title'));});
    $("#distiller-title").longpress(function() {alert($(this).attr('title'));});
    $("#scrum-title").longpress(function() {alert($(this).attr('title'));});
    $("#cprofile-title").longpress(function() {alert($(this).attr('title'));});
    $("#jprofiler-title").longpress(function() {alert($(this).attr('title'));});
    $("#lineprofiler-title").longpress(function() {alert($(this).attr('title'));});
    $("#tina-title").longpress(function() {alert($(this).attr('title'));});
    $("#hets-title").longpress(function() {alert($(this).attr('title'));});
    $("#slx-title").longpress(function() {alert($(this).attr('title'));});
    $("#intellij-title").longpress(function() {alert($(this).attr('title'));});
    $("#pycharm-title").longpress(function() {alert($(this).attr('title'));});
    $("#webstorm-title").longpress(function() {alert($(this).attr('title'));});
    $("#android-studio-title").longpress(function() {alert($(this).attr('title'));});
    $("#visual-studio-code-title").longpress(function() {alert($(this).attr('title'));});
    $("#xcode-title").longpress(function() {alert($(this).attr('title'));});
    $("#azure-title").longpress(function() {alert($(this).attr('title'));});
    $("#oci-title").longpress(function() {alert($(this).attr('title'));});
    $("#bpmn-title").longpress(function() {alert($(this).attr('title'));});
    $("#z-title").longpress(function() {alert($(this).attr('title'));});
    $("#mcrl-title").longpress(function() {alert($(this).attr('title'));});
    $("#casl-title").longpress(function() {alert($(this).attr('title'));});
}

/**
 * https://stackoverflow.com/questions/19999388/check-if-user-is-using-ie
 */
function detectIEEdge() {
    return /MSIE|Trident|Edge\//.test(window.navigator.userAgent);
}