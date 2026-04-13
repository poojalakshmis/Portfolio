package com.portfolio.portfolio.web;

import com.portfolio.portfolio.model.EducationEntry;
import com.portfolio.portfolio.model.ExperienceEntry;
import com.portfolio.portfolio.model.SkillCategory;
import com.portfolio.portfolio.service.PortfolioDataRepository;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PortfolioController {

  private final PortfolioDataRepository portfolioDataRepository;

  public PortfolioController(PortfolioDataRepository portfolioDataRepository) {
    this.portfolioDataRepository = portfolioDataRepository;
  }

  @GetMapping("/skills")
  public List<SkillCategory> skills() {
    return portfolioDataRepository.findAllSkillCategories();
  }

  @GetMapping("/experience")
  public List<ExperienceEntry> experience() {
    return portfolioDataRepository.findAllExperience();
  }

  @GetMapping("/education")
  public List<EducationEntry> education() {
    return portfolioDataRepository.findAllEducation();
  }
}
