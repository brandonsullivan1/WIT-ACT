export const NAME_REGEX = /^[A-Z][a-zA-Z- ]+$/;
export const EMAIL_REGEX = /[a-z0-9]@wit.edu/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const PHONE_NUMBER_REGEX = /[0-9]+.{9}/;

export const DISCORD_REGEX = /.+[#d].{4}/;

export const VALID_MINORS = [
    "Aerospace Engineering",
    "American Studies",
    "Applied Math",
    "Architectural Studies",
    "Biology",
    "Business Analytics",
    "Chemistry",
    "Civil Engineering",
    "Computer Networking",
    "Computer Science",
    "Construction Management",
    "Cybersecurity Management",
    "Data Science",
    "Electrical Engineering",
    "Environmental Engineering",
    "Financial Mathematics",
    "Internet of Things",
    "Manufacturing",
    "Media, Culture, and Communication Studies",
    "Performing Arts",
    "Physics",
    "Science, Technology, and Society",
    "Sustainability"
];

export const TAGS = [
    "(Optional) Select tag...",
    "Technology",
    "Health",
    "Environment",
    "Education",
    "Government",
    "Finance",
    "Communications",
];

export const SKILLS = {
    "Select general skill...": {
        "Select skills focus...": ["Select specific skill..."],
    },
    "Computing and Data Science": {
        "Select skills focus...": ["Select specific skill..."],
        "Applied Mathematics": [
            "Select specific skill...",
            "Calculus",
            "Numerical Analysis",
            "Advanced Statistics",
            "Discrete Mathematics",
            "Differential Equations",
        ],
        "Computer Networking": [
            "Select specific skill...",
            "Routing and Switching",
            "Network Administration",
            "System Administration",
            "Web Development",
            "Project Management",
            "Network Security",
            "Wireless Networks"
        ],
        "Computer Science": [
            "Select specific skill...",
            "Software Engineering",
            "Mobile Development",
            "Web Development",
            "Backend Development",
            "Databases",
            "Network Programming",
            "Algorithms",
            "Data Structures",
        ],
        "Cybersecurity": [
            "Select specific skill...",
        ],
        "Data Science": ["Select specific skill..."],
        "Information Technology": ["Select specific skill..."],
    },
    "Science & Humanities": {
        "Select skills focus...": ["Select specific skill..."],
        "Applied Sciences": ["Select specific skill..."],
        "Computer Science & Society": ["Select specific skill..."],
    },
    "Architecture & Design": {
        "Select skills focus...": ["Select specific skill..."],
        "Architecture": ["Select specific skill..."],
        "Industrial Design": ["Select specific skill..."],
        "Interior Design": ["Select specific skill..."],
    },
    "Engineering": {
        "Select skills focus...": ["Select specific skill..."],
        "Biological Engineering": ["Select specific skill..."],
        "Biomedical Engineering": ["Select specific skill..."],
        "Civil Engineering": ["Select specific skill..."],
        "Computer Engineering": ["Select specific skill..."],
        "Electrical Engineering": ["Select specific skill..."],
        "Electromechanical Engineering": ["Select specific skill..."],
        "Engineering": ["Select specific skill..."],
        "Mechanical Engineering": ["Select specific skill..."],
    },
    "Management": {
        "Select skills focus...": ["Select specific skill..."],
        "Business Management": ["Select specific skill..."],
        "Computer Information Systems": ["Select specific skill..."],
        "Construction Management": ["Select specific skill..."],
    },
};