---
tags: ["delivery-and-flow"]
title: Well written requirements
#id:
#sidebar_label:
#keywords:
#  - keyword1
#  - keyword2
#  - keyword3
description: This page outlines the importance of well-written requirements in agile product development, emphasizing user stories as key tools for clarity and adaptability. It details best practices for writing requirements, including the "INVEST" criteria and acceptance criteria using the Gherkin format, while cautioning against common anti-patterns that hinder effective team collaboration and product innovation.
#tags:
#  - tag1
#  - tag2
#  - tag3
---


![Well Written Requirements](Well%20written%20requirements_media/media/image1.jpeg)

# Well Written Requirements (CDF Pattern)



Well-written requirements that are easily understood by everyone are one of the foundational practices that enable teams to perform. Empowered teams need to understand the problems they are trying to solve, and well-written requirements should describe problems, not solutions.

Here we explore what makes a good requirement and link to various resources that explore the topic in more depth.

## Just Enough Context. Just Enough Detail

Well-written requirements provide just enough context and just enough detail. They enable teams to establish and maintain a common understanding of what's needed and to work in a just-in-time manner.

Agile teams leverage feedback from the market to learn and improve, and most teams capture their requirements in the form of stories, also called user stories. However, writing too many stories upfront and/or capturing too much detail too soon can limit and tie them into specific solutions before they've had the chance to test the market and get feedback.

Giving up this optionality too soon is a mistake and may also result in waste, since detailed stories created too early often become redundant or need to be rewritten.

It's not only undesirable to identify and capture a great deal upfront, in many cases it's not possible since [**product development generally exists in the Complex domain**](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/cA5DcI8h54ye17yXUNla6w/b36805f8-cf48-47ce-a831-c885989289d1.aspx) and necessitates an adaptive approach.

There are, however, circumstances when stories might need more detail, and this will be influenced by factors such as:

- How long people have worked on a product and their understanding of the business area or operational environment.

- Whether the team is simply given work to implement and deliver, or whether the team is operating as a problem-solver.

- Whether the team members are geographically dispersed.

- The make-up of the team, level of experience, recent joiners, etc.

- Dependencies outside of the team.

## Requirements Expressed as Stories

Stories are short requirements written from the perspective of an end-user. As a minimum, they should provide sufficient detail of the intent or outcome - helping to provide a common understanding of what's needed.

Stories enable conversations and collaboration among the team and any others involved in achieving the outcome, and these discussions are vital for success. They should be inclusive and should lead to greater understanding - adding more detail and splitting stories into multiple smaller ones just before they are to be worked on.

Anyone can write a story at any time, and they provide the flexibility to express something large or something small. Within Global Technology, we have chosen to use a hierarchy of stories to help provide structure to our backlogs. This hierarchy uses [**Epic, Feature, and Product Backlog Item**](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/cA5DcI8h54ye17yXUNla6w/388a414f-4b39-4a75-85ba-621264a4b949.aspx).

There are several different formats for writing stories and acceptance criteria, but a user story, which is expressed from the point of view of someone in a particular role, uses the "user's voice" to describe a need. This provides useful context which is important in local decision-making and also provides empathy, reminding us that we are writing software which will impact the work experience of users -- for better or for worse.

## How to Write a Good User Story

A user story describes a need from the perspective of a user with a particular role. The format typically used is:

As a \<user role\> I want \<some goal/outcome\> So that \<some reason\>

![User Story Format](Well%20written%20requirements_media/media/image2.png)

In most circumstances, it's useful to start with the who since that helps us to be customer-centric, but there are times when it's helpful to start with the what to ensure the goal or outcome is given extra attention. However, the format used is less important than the understanding that must be conveyed.

Start by capturing the Who, What, and Why, ensure there is a common understanding, and then get clear about how to validate whether the goal or outcome has been achieved.

The article [**User Stories and the Alternatives**](https://www.scruminc.com/user-stories-and-the-alternatives) looks at other formats that can be used, including system stories and job stories.

There might be various aspects to a story:

- Some fixed with no scope to change, e.g., a calculation.

- Some part of a constraint, e.g., must align with a wider agreed approach to a solution, perhaps previously validated, non-functional requirements.

- Some flexible, e.g., empowering developer decision-making.

- Some parts that only come to light once development has started.

- The whole purpose of a story might be about learning, experimenting, and validating.

Additional information that might be associated with a story includes assumptions, risks, dependencies, size, and priority.

A useful way to become better at writing user stories is to use the **INVEST** acronym which is explored in the article [**Invest in Good User Stories**](https://agileforall.com/new-to-agile-invest-in-good-user-stories/).

Stories will change, so keep them up to date. And progressively enrich them with valuable information, e.g., links to confluence pages, photos or screenshots of design sessions, key decisions made, and the reasons behind them.

## Acceptance Criteria

Acceptance criteria are a set of predefined conditions that must be met to mark a user story complete. These are best represented as a testable list that can be answered as true or false and can be thought of as conditions of satisfaction. It's often helpful to use the acceptance criteria as a script when demonstrating the story to show that the intent has been met.

In the article [**The Two Ways to Add Detail to User Stories**](https://www.mountaingoatsoftware.com/blog/the-two-ways-to-add-detail-to-user-stories) Mike Cohn suggests the two ways to appropriately add extra details to user stories are: split the story or add acceptance criteria to it.

One format that is often used for writing acceptance criteria is Gherkin, a structured approach to writing behavioral tests, often used as part of [**Behavioral Driven Development (BDD)**](https://specflow.org/learn/bdd/).

Given \<initial state\> When \<an event or action\> Then \<expected result or outcome\>

![Acceptance Criteria Format](Well%20written%20requirements_media/media/image3.png)

The information required to form a well-written requirement is something to consider when writing and agreeing on your [**Definition of Ready**](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/cA5DcI8h54ye17yXUNla6w/7b41446b-109e-4460-99ac-37ce8c62dd91.aspx).

## Anti-Patterns

When trying to improve our ways of working, it's almost inevitable that some choices will hamper rather than improve our efforts to build the right product and build the product right.

Some of these choices might solve a current problem but cause issues such as re-work down the line, and being aware of some of these '[**antipatterns**](https://schroders365eur.sharepoint.com/sites/myschroders/content/Pages/CorporatePages/cA5DcI8h54ye17yXUNla6w/388a414f-4b39-4a75-85ba-621264a4b949.aspx)' can help us avoid them. Some of the antipatterns related to requirements and stories writing are:

- The Product Owner writes detailed stories and defines all of the acceptance criteria, but does so alone or only in conjunction with a BA.

- The Product Owner is busy writing stories and is too busy to collaborate with the team or respond to their questions.

- Conversations don't happen, because everything anyone "needs to know" is already in the story.

- The need is poorly described.

- Infrequent, large releases allow gold-plating to be added -- expanding the scope beyond what would be considered a sufficient Minimum Viable Product (MVP) or Minimum Marketable Feature (MMF).

- The backlog contains many stories that will never be implemented; however, no one dares to remove them because so much time and energy were invested in writing them.

- The team simply implements what is defined for them and feels incapable of meeting user expectations, as they are kept away from speaking directly. Consequently, the team doesn't feel the need to take ownership.

- Discovery and Delivery are considered totally separate activities that are performed by different teams in different functions. Our understanding, and hence our requirements, are ever evolving, and therefore Discovery is an ongoing process which should be as close to Delivery as possible.

## Further Reading

- [**User Stories Applied**](https://www.mountaingoatsoftware.com/books/user-stories-applied), by Mike Cohn

- [**200 Real Life User Stories, Examples by Mike Cohn**](https://www.mountaingoatsoftware.com/agile/user-stories)

- [**Why the Three-Part User Story Template Works So Well**](https://www.mountaingoatsoftware.com/blog/why-the-three-part-user-story-template-works-so-well)

- [**Advantages of the "As a user, I want" User Story Template**](https://www.mountaingoatsoftware.com/blog/advantages-of-the-as-a-user-i-want-user-story-template)

- [**Essential XP: Card, Conversation, Confirmation**](https://ronjeffries.com/xprog/articles/expcardconversationconfirmation/)

- [**The Humanizing Work Guide to Splitting User Stories**](https://www.humanizingwork.com/the-humanizing-work-guide-to-splitting-user-stories/)

- [**Keep Actual Effort and Outcome Visible**](https://www.jpattonassociates.com/keep-actual-effort-and-outcome-visible/), by Jeff Patton





## Page Topics and Tags

**Tags**
