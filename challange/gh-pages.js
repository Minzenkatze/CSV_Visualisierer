import { publish } from 'gh-pages';

publish(
    'build', // path to public directory
    {
        branch: 'gh-pages',
        repo: "https://github.com/Minzenkatze/CSV_Visualisierer.git",
        dotfiles: true
    },
    () => {
        console.log("Deploy complete");
    }
);