## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# How to create a branch

Start with this command to clone the repository:
```sh
git clone https://github.com/rice-apps-launchpad/wellbeing-resource-matcher.git
```

By default, you will be on the branch called `main`. When you want to make an edit to the app, you should **create a new branch**:

```sh
git checkout -b NEW_BRANCH_NAME
```

Then go ahead and make your changes! Every so often you should use VSCode's inbuilt UI to **commit** and **push** your changes to your branch. You can commit and push to your own branch as many times as you want—save your work!

When your task is complete, let Omar know and I will review your branch and create a **pull-request**.

If you want to start a new feature, switch back to main with:

```sh
git checkout main
```

and then update with any changes that came from the server:

```sh
git pull
```

Done! You're ready to create a new branch from this point and restart the process.