package com.portfolio.portfolio.model;

import java.util.List;

public record EducationEntry(
    String degree, String institution, String period, List<String> highlights) {}
