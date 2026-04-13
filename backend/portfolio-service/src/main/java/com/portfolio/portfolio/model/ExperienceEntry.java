package com.portfolio.portfolio.model;

import java.util.List;

public record ExperienceEntry(
    String company,
    String role,
    String period,
    String location,
    List<String> achievements) {}
