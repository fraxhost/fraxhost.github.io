---
layout: post
title: "Hello, World"
date: 2025-06-10
---

Welcome to my blog. I'm Ahmed Ryan, a PhD student in Computer Science at the University of Alabama. This first post covers what this blog is about, who I am, and what you can expect going forward. It's intentionally long — partly to introduce myself properly, partly to test that the table of contents works the way it should.

## Why I Started Writing

Research is full of ideas that don't fit neatly into a paper. Notes get buried in notebooks, half-finished thoughts live in scattered files, and useful findings from side experiments never see the light of day. Writing publicly forces clarity — if you can't explain it simply, you probably don't understand it well enough yet.

I also read a lot of technical blogs that saved me hours of debugging or pointed me toward a better approach. This is my attempt to return the favour.

There's a second, more selfish reason. Writing slows down thinking in a useful way. When I work through something mentally it feels complete, but the moment I try to write it down the gaps become obvious. A blog post is a forcing function — it demands that the reasoning be airtight before you hit publish.

## What to Expect

Most posts will be short and practical: things I figured out while working on research or side projects. Topics will orbit around a few recurring themes.

### Software Supply Chain Security

My main research area. Malicious packages in open-source ecosystems, automated detection using machine learning, threat intelligence pipelines, and the broader problem of trusting code you didn't write.

The attack surface here is enormous and largely underappreciated. Every `pip install`, `npm install`, or `cargo add` is an implicit trust decision. You're running arbitrary code from a stranger, often without reading it, on your development machine and eventually in production. When attackers figured this out, they got creative: typosquatting, dependency confusion, account takeovers, and post-install scripts that phone home or exfiltrate credentials.

I'm particularly interested in the detection side — building systems that can flag suspicious packages at scale before they reach developers.

### Malware Analysis

Static and dynamic analysis techniques, writing YARA rules, digging through suspicious packages, and occasionally reversing small samples to understand what they're doing.

Most malicious packages I've looked at aren't sophisticated. They don't need to be. The attacker's goal is to get code executed on as many machines as possible before being detected and removed. That means fast, simple payloads — a reverse shell, credential harvester, or cryptominer — wrapped in a plausible-looking package with a few hundred stars and a copied README.

The interesting question is not "how do I reverse this specific sample" but "what distinguishes this from the million legitimate packages I'm not looking at." That's fundamentally a classification problem.

### Machine Learning in Security

Not hype — practical applications. Using language models and classical ML to detect anomalies in code, classify packages, and automate parts of the threat intel workflow.

I'm skeptical of claims that LLMs will replace human analysts. They make confident mistakes, they hallucinate, and they're expensive to run at scale. But they're genuinely useful for specific sub-tasks: summarising what a piece of obfuscated code does, extracting indicators from unstructured threat reports, or generating first-draft YARA rules that a human then refines.

Classical ML — gradient boosting on handcrafted features, in particular — still outperforms transformer-based approaches on structured tabular data. Both have their place.

### Tools and Workflows

Occasionally I'll write about the tools and setups that make research faster: scripting, data pipelines, notebook workflows, and anything else that meaningfully reduces friction.

Research tooling is chronically underdiscussed. Papers describe what was found, not how the infrastructure was set up to find it. But a well-designed data pipeline can be the difference between running an experiment in two hours and running it in two weeks.

## Background

### Getting Started in Security

My interest in security started in 2020 when I competed in a national CTF competition and placed in the top 20 out of 234 teams. That competition made it clear that security wasn't just a career path — it was a puzzle I genuinely enjoyed.

CTFs are a strange introduction to security. They reward a kind of lateral thinking that's hard to teach formally: seeing an integer overflow where an input form was expected, noticing that a "random" token is actually sequential, or recognising the visual signature of a particular cipher. The skills don't always transfer directly to research, but the habit of looking for unexpected behaviour in software does.

### Industry Work

Before starting my PhD I worked at **Cefalo**, building secure web-based software for European clients. The work was largely backend — APIs, authentication flows, data handling — with a security-first mandate from clients who were subject to GDPR and stricter national regulations.

Working in industry before graduate school gave me a different perspective on security research. Academic papers often assume adversaries with sophisticated capabilities, but the most common vulnerabilities in production systems are embarrassingly mundane: hardcoded credentials, dependency staleness measured in years, logging that captures passwords in plaintext. The gap between the threat model in papers and the threat model in practice is worth thinking about.

During a 2022 internship I applied OWASP standards to build secure web applications, and later contributed to research on AI-driven community smell detection at the Intelligent Systems and HCI Research Group.

### Starting the PhD

I joined the University of Alabama's PhD programme in Computer Science with a focus on software supply chain security. The research group I work with approaches the problem from a data-science angle: collecting large corpora of packages, extracting features at multiple levels (metadata, code structure, network behaviour, version history), and training models to distinguish benign from malicious.

The work is collaborative. Threat intelligence doesn't live in isolation — a package flagged on PyPI might have been ported from a known npm campaign, or share infrastructure with a phishing kit targeting developers. Connecting those dots requires working with datasets from multiple ecosystems and sharing findings with maintainers and registries.

## The State of Open-Source Security

Open-source software has won. The vast majority of modern software — commercial, governmental, academic — is built on a foundation of open-source components. That's genuinely good: it enables knowledge sharing, reduces duplication of effort, and allows small teams to build things that would have required hundreds of engineers twenty years ago.

But it created a new attack surface that we are only beginning to understand.

### The Scale Problem

PyPI alone hosts over 500,000 packages. npm has more than 2 million. No team of humans can review all of them. Automated detection is not optional — it's the only viable approach at this scale.

The challenge is that most automated detection relies on known-bad patterns: signatures, heuristics, blocklists. These catch the unsophisticated attacks quickly but fail against anything novel. Building detectors that generalise to previously-unseen attack patterns is the hard problem.

### The Trust Problem

Package managers were designed for a world where code comes from trusted sources — language foundations, well-known companies, individual developers with established reputations. That model doesn't hold at scale. Any account can publish any package name that isn't already taken. The barriers are intentionally low to encourage contribution.

The same openness that makes open-source powerful makes it easy to abuse. Attackers don't need to break into a registry — they just need to publish.

### What Detection Looks Like

A useful detector has to operate at multiple levels simultaneously:

- **Metadata level**: Is the package name a plausible typosquat? Does it have an implausible number of downloads relative to its age? Does the description copy text from a legitimate package?
- **Code level**: Does the install script touch the filesystem in unexpected ways? Does it make outbound network connections? Does it import modules that have no relation to the stated purpose?
- **Behavioural level**: What does the package actually do when run in a sandbox? Does it attempt to read environment variables, SSH keys, or browser credential stores?
- **Graph level**: Is this package part of a cluster of recently-created accounts that all publish similar packages? Does the author's account have suspicious history?

No single level is sufficient. A sophisticated attacker can pass metadata and code checks by writing clean-looking code that only activates under specific conditions. Dynamic analysis catches more but is expensive and can be evaded by environment detection.

## Research Challenges

### Ground Truth

The hardest problem in this field is ground truth. To train a classifier, you need labelled examples — packages you're confident are malicious and packages you're confident are benign. The malicious examples are hard to come by at scale. Most published datasets are small, biased toward known campaign types, and quickly become stale as attackers adapt.

Generating synthetic malicious packages is an option, but the distribution of synthetic data doesn't match the distribution of real attacks. A model trained on synthetic data may learn to detect the synthetic patterns rather than the actual threat.

### Adversarial Robustness

Any public detector becomes a target for evasion. Once attackers know the features a detector uses, they can craft packages that score well on those features while still being malicious. This is not a theoretical concern — there are published examples of researchers reverse-engineering production detectors and demonstrating evasion.

The right response is not to keep detectors secret (security through obscurity is not a strategy) but to build detectors that are hard to evade by design: diverse feature sets, ensemble methods, and regular retraining on fresh data.

### Ecosystem Fragmentation

Different package ecosystems have different conventions, different metadata schemas, different install mechanisms, and different community norms. A detection pipeline built for PyPI needs significant rework to operate on npm, Cargo, or RubyGems. Building ecosystem-agnostic tooling is an open research problem.

## Tools I Use

### For Analysis

- **Semgrep**: Static analysis with custom rules. Fast, hackable, and good at pattern matching across large codebases.
- **YARA**: Industry-standard rule language for malware detection. Verbose to write but extremely expressive.
- **Frida**: Dynamic instrumentation. Invaluable for understanding what a binary does at runtime without reading the assembly.
- **Wireshark / tshark**: Network analysis. Most malware phones home; watching the traffic tells you where.

### For Research

- **Jupyter**: Exploratory data analysis. The ability to iterate quickly on a dataset without writing a full script first is genuinely valuable.
- **DVC**: Version control for datasets and model artefacts. Git for data. Solves the problem of keeping code and the data it was trained on in sync.
- **Weights & Biases**: Experiment tracking. I log every training run with hyperparameters, metrics, and artefacts so I can reproduce any result from the past.

### For Writing

Plain Markdown, rendered to HTML by Jekyll. No CMS, no database, no deployment pipeline beyond a `git push`. The simplicity is the point — the fewer moving parts, the less that can go wrong.

## What I'm Working On Now

My current focus is building a multi-ecosystem malware detection pipeline that operates on metadata, code, and install-time behaviour simultaneously. The goal is a system that can ingest new packages in near-real-time and flag candidates for human review with high precision — false positives are expensive because they erode trust in the detector.

Preliminary results on the PyPI ecosystem are promising. I'm in the process of extending the pipeline to npm, which is a larger and messier dataset but also where some of the most damaging supply chain attacks have originated.

I'm also working on a dataset paper — a curated, versioned collection of confirmed-malicious packages with ground-truth labels and metadata, intended to give the research community a common benchmark for comparing detection approaches.

## Get in Touch

If something I write is wrong, incomplete, or could be said better — I want to know. Reach me at [aryan9@crimson.ua.edu](mailto:aryan9@crimson.ua.edu) or open an issue on [GitHub](https://github.com/fraxhost).

If you're working on something related — supply chain security, package analysis, threat intelligence pipelines — I'm always interested in talking to people doing adjacent work.
