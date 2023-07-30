export const NAME_REGEX = /^[A-Z][a-zA-Z- ]+$/;
export const EMAIL_REGEX = /[a-z0-9]@wit.edu/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const PHONE_NUMBER_REGEX = /[0-9]+.{9}/;
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
    "Technology",
    "Health",
    "Environment",
    "Education",
    "Government",
    "Finance",
    "Communications",
];

export const SKILLS = {
    "": {
        "": [""],
    },
    "Computing and Data Science": {
        "Applied Mathematics": [
            "Calculus",
            "Numerical Analysis",
            "Advanced Statistics",
            "Discrete Mathematics",
            "Differential Equations",
        ],
        "Computer Networking": [
            "Routing and Switching",
            "Network Administration",
            "System Administration",
            "Web Development",
            "Project Management",
            "Network Security",
            "Wireless Networks"
        ],
        "Computer Science": [
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

        ],
        "Data Science": [],
        "Information Technology": [],
    },
    "Science & Humanities": {
        "Applied Sciences": [],
        "Computer Science & Society": [],
    },
    "Architecture & Design": {
        "Architecture": [],
        "Industrial Design": [],
        "Interior Design": [],
    },
    "Engineering": {
        "Biological Engineering": [],
        "Biomedical Engineering": [],
        "Civil Engineering": [],
        "Computer Engineering": [],
        "Electrical Engineering": [],
        "Electromechanical Engineering": [],
        "Engineering": [],
        "Mechanical Engineering": [],
    },
    "Management": {
        "Business Management": [],
        "Computer Information Systems": [],
        "Construction Management": [],
    },
};