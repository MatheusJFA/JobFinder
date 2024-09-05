function lookupWebsites(type) {
    switch (type) {
        case '1':
            return [
                "gupy.io",
                "solides.com.br",
                "vagas.com",
                "indeed.com.br",
                "linkedin.com",
                "catho.com.br",
                "infojobs.com.br",
                "boards.greenhouse.io",
                "jobs.ashbyhq.com",
                "jobs.jobvite.com",
                "myworkdayjobs.com",
                "careers.jobscore.com",
                "ats.comparably.com",
                "*.bamboohr.com",
                "*.remote.com"
            ]
        case '2':
            return [
                "freelancer.com",
                "upwork.com",
                "workana.com",
                "99freelas.com.br",
                "getninjas.com.br",
                "freelancermap.com",
                "freelancer.com.br"
            ]
    }

}

module.exports = lookupWebsites;