

const express = require('express');
const router = express.Router();
const { readData } = require('../utils/jsonStore');


function generateRecommendations(skills) {
  const recommendations = [];

  if (!skills.length) {
    return [
      {
        title: 'Start with HTML & CSS',
        reason: 'Build a strong foundation before diving into advanced topics',
      },
      {
        title: 'Explore JavaScript Basics',
        reason: 'JavaScript is essential for modern web development careers',
      },
      {
        title: 'Create Your First Project',
        reason: 'Hands-on projects help you stand out to recruiters',
      },
    ];
  }

  const skillMap = {};
  skills.forEach((s) => {
    skillMap[s.name.toLowerCase()] = s.level;
  });

  
  if (skillMap.javascript !== undefined && skillMap.javascript >= 50) {
    recommendations.push({
      title: 'Learn React',
      reason: 'Based on your JavaScript progress',
    });
  }

  
  if (
    skillMap.javascript !== undefined &&
    skillMap.javascript >= 40 &&
    skillMap['html'] !== undefined
  ) {
    recommendations.push({
      title: 'Explore Node.js',
      reason: 'Expand from frontend to full-stack development',
    });
  }

  
  skills.forEach((skill) => {
    if (skill.level < 40) {
      recommendations.push({
        title: `Improve ${skill.name}`,
        reason: `Your ${skill.name} level is ${skill.level}% — focus on practice projects`,
      });
    }
  });

  
  skills.forEach((skill) => {
    if (skill.level >= 80) {
      recommendations.push({
        title: `Master Advanced ${skill.name}`,
        reason: `You're at ${skill.level}% in ${skill.name} — try open-source contributions`,
      });
    }
  });

  
  const avgLevel =
    skills.reduce((sum, s) => sum + s.level, 0) / skills.length;

  if (avgLevel >= 60) {
    recommendations.push({
      title: 'Apply for Internships',
      reason: 'Your skill average suggests you are ready for real-world experience',
    });
  }

  
  recommendations.push({
    title: 'Build a Portfolio Website',
    reason: 'Showcase your projects to increase internship acceptance rates',
  });

  
  const seen = new Set();
  return recommendations
    .filter((rec) => {
      if (seen.has(rec.title)) return false;
      seen.add(rec.title);
      return true;
    })
    .slice(0, 6);
}


router.get('/', async (req, res, next) => {
  try {
    const skills = await readData('skills.json');
    const recommendations = generateRecommendations(skills);

    res.status(200).json({
      success: true,
      message: 'Recommendations generated successfully',
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
