(async function () {
    const COEFFICIENTS = {
        17278: 6.5,
        17165: 7,
        19125: 5.7,
        17727: 6.5,
        19164: 5.7,
        19178: 11.5,
        19134: 1
    };

    const villages = {
        "6.5": "Стадниця",
        "7": "Десна",
        "5.7": "М. Крушлинці",
        "11.5": 'В. Крушлинці',
        "1": "Він. Хутори",
        "6.0": "Писарівка",
        "6.1": "Щітки"
    };

    /**
     * @description retrieves projects from e-dem api
     * @returns {Array} - collection of projects
     */
    async function getProjects() {
        const apiUrl = 'https://budget.e-dem.ua/Home/GetProjects?KOATTU=0510100000&count=48&curStage=3&sequence=0&sort=1';
        const ids = Object.keys(COEFFICIENTS).map(item => Number(item));
        let response = await fetch(apiUrl, {
            method: 'GET'
        });

        let projects = (await response.json()).Projects;

        return projects.filter((project) => {
            return project ? ids.indexOf(project.Id) >= 0 : false;
        });
    }

    /**
     * @description Calculates project rating based on its votes, coefficient and budget
     * @param {number} budget - project budget
     * @param {number} votes  - number of votes
     * @param {number} coefficient - project coefficient
     * @returns {number} rating of the project
     */
    function getRating(budget, votes, coefficient) {
        if (budget > 0 && votes > 0) {
            return Math.round((coefficient * votes / budget * 1000) * 10000) / 10000;
        }

        return 0;
    }

    /**
     * @description Helps to retrieve a village name by a project coefficient
     * @param {number} coefficient - project coefficient
     * @returns {string} village name
     */
    function getVillageByCoefficient(coefficient) {
        return villages[coefficient] || '';
    }

    /**
     * 
     * @param {object} top - first leading project
     * @param {objetc} current - current project to compare
     * @returns {number} number of votes to reach the top project
     */
    function calculateVotesLag(top, current) {
        const diffRate = top.rating - current.rating;

        if (diffRate > 0 ) {
            return Math.ceil((diffRate * current.budgetValue) / (current.coefficient * 1000)) * -1;
        }

        return 0;
    }

    let projects = await getProjects();
    projects = projects.map((project) => {
        const coefficient = COEFFICIENTS[String(project.Id)];
        const totalVotes = Number(project.OnlineVotes) + Number(project.OfflineVotes);
        return {
            id: project.Id,
            number: project.Number,
            title: project.Title,
            village: getVillageByCoefficient(coefficient),
            budget: new Intl.NumberFormat('uk-UA').format(project.Budget) + ' грн',
            budgetValue: project.Budget,
            totalVotes: totalVotes,
            coefficient: coefficient,
            votesLag: 0,
            rating: getRating(project.Budget, totalVotes, coefficient)
        }
    }).sort(
        (a, b) => {
            return b.rating - a.rating;
        }
    );

    let topProject = projects[0];
    projects.map((project) => {
        project.votesLag = calculateVotesLag(topProject, project);
    });

    const mapping = {
        number: '№',
        title: 'Назва',
        village: 'Населений пункт',
        budget: 'Бюджет',
        totalVotes: 'Голосів',
        coefficient: 'Коефіцієнт',
        rating: 'Рейтинг',
        votesLag: 'Відставання'
    };

    /**
     * @description creates table rows
     * @param {object} project - instance of project
     */
    function renderProject(project) {
        const tableBody = document.querySelector('.js-results-body');
        const row = document.createElement("tr");
        let cols = Object.keys(mapping).map((name) => {
            let cell;
            switch(name) {
                case 'title':
                    cell = `<td data-label="${mapping[name]}"><a href="https://budget.e-dem.ua/0510100000/project/${project.id}" target="_blank">${project[name]}</a></td>`;
                    break
                default:
                    cell = `<td data-label="${mapping[name]}">${project[name]}</td>`;

            }

            return cell;
        });

        row.innerHTML = cols.join('');
        tableBody.append(row);
    }

    for (let project of projects) {
        renderProject(project);
    }

    console.table(projects);
    

})();