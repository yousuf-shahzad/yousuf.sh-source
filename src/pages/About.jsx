import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import ScrollProgress from '../components/ScrollProgress'
import usePageMetadata from '../hooks/usePageMetadata'

const skills = {
    Languages: ['Python', 'JavaScript', 'HTML & CSS', 'SQL'],
    Tools: ['React', 'Node.js', 'Flask', 'Git', 'PostgreSQL'],
}

const achievements = [
    {
        title: 'Lockheed Martin Code Quest',
        result: '2nd place',
        detail: '2025',
    },
    {
        title: 'SIAM Mathworks M3 Competition',
        result: 'Second round',
        detail: 'Top 18%',
    },
]

export default function About() {
    usePageMetadata({
        title: 'About | Yousuf Shahzad',
        description:
            'Learn about Yousuf Shahzad, a first-year Computer Science student at UCL, and his technical interests and achievements.',
        url: 'https://yousuf.sh/about/',
    })
    return (
        <PageTransition className="relative min-h-screen overflow-x-hidden">
            <ScrollProgress />
            <header className="px-5 sm:px-8 lg:px-24 pt-24 sm:pt-32 lg:pt-40 mb-14 sm:mb-20">
                <h1 className="text-5xl sm:text-6xl md:text-8xl leading-tight title mb-6">
                    ABOUT ME
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
                    Who is Yousuf Shahzad?
                </p>
            </header>

            <div className="px-5 sm:px-8 lg:px-24 pb-16 sm:pb-20">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(20rem,0.7fr)] lg:gap-16">
                    <section className="max-w-3xl space-y-6 text-lg leading-relaxed text-gray-800 sm:text-xl">
                        <p>
                            I have always been attracted to how things work.
                            From a young age, I&apos;d look at the websites
                            I&apos;d browse regularly, in awe, and wonder about
                            their inner workings. My mother had bought me a book
                            on the Scratch programming language, followed by
                            another on HTML &amp; CSS the year after, which I
                            devoured. This culminated in my first project; a
                            simple birthday countdown. Yet, this would spell the
                            beginning for my programming journey.
                        </p>
                        <p>
                            I completed my A-levels with A* grades in
                            Mathematics and Further Mathematics, an A in
                            Computer Science, and an A* in my EPQ on AES-256. I
                            am now studying Computer Science at UCL as a
                            first-year student, continuing to strengthen my
                            foundations in logical and abstract thinking.
                        </p>
                        <p>
                            Beyond programming, I really enjoy working with
                            various types of media. Working with video editing
                            and graphic design allows me to unleash my
                            creativity, and I have a love for sports that
                            fosters my more competitive side. You&apos;ll also
                            find me always experimenting with new and different
                            technologies, as I still possess the persistent
                            curiousity that defined my route into this field.
                        </p>
                        <p>
                            At the start of my degree, I am excited by the
                            depth, new perspectives, and opportunities ahead.
                            There is always something new to learn, something
                            different to try, and something to improve upon. I
                            am committed to building solutions that are both
                            engaging and impactful.
                        </p>
                    </section>

                    <aside className="rounded-lg bg-white p-5 shadow-lg sm:p-8">
                        <h2 className="mt-3 text-3xl title">
                            Technical proficiencies
                        </h2>
                        <div className="mt-8 grid gap-7">
                            {Object.entries(skills).map(
                                ([category, values]) => (
                                    <section key={category}>
                                        <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
                                            {category}
                                        </h3>
                                        <ul className="mt-3 flex flex-wrap gap-2">
                                            {values.map((skill) => (
                                                <li
                                                    key={skill}
                                                    className="rounded-full bg-gray-100 px-3 py-1.5 text-gray-700"
                                                >
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )
                            )}
                        </div>
                    </aside>
                </div>

                <section className="mt-16 sm:mt-20 max-w-4xl">
                    <h2 className="text-3xl sm:text-4xl title mb-8">
                        ACHIEVEMENTS
                    </h2>
                    <div className="grid gap-4 sm:gap-8 md:grid-cols-2">
                        {achievements.map((achievement) => (
                            <article
                                key={achievement.title}
                                className="rounded-lg bg-white p-5 shadow-lg sm:p-8"
                            >
                                <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500">
                                    Competition
                                </p>
                                <h3 className="mt-3 text-2xl title leading-tight">
                                    {achievement.title}
                                </h3>
                                <p className="mt-5 text-lg font-medium">
                                    {achievement.result}
                                </p>
                                <p className="mt-1 text-gray-600">
                                    {achievement.detail}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mt-16 sm:mt-20 max-w-4xl rounded-lg bg-white p-5 shadow-lg sm:p-8">
                    <h2 className="text-3xl title mb-4">
                        LET&apos;S BUILD SOMETHING
                    </h2>
                    <p className="max-w-2xl text-gray-600 mb-6">
                        I&apos;m always keen to learn from ambitious projects
                        and thoughtful collaborations.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex group px-6 py-3 bg-black border-2 border-black text-white text-lg rounded hover:bg-gray-800 transition"
                    >
                        Get in touch{' '}
                        <span className="ml-2 group-hover:ml-6 duration-500">
                            →
                        </span>
                    </Link>
                </section>
            </div>
        </PageTransition>
    )
}
