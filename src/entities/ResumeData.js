export class ResumeData {
  constructor({
    valid = false,
    score = 0,
    rating = '',
    breakdown = {},
    missing_sections = {},
    missing_skills = [],
    present_skills = [],
    improvement_suggestions = [],
    notes = ''
  } = {}) {
    this.valid = valid;
    this.score = score;
    this.rating = rating;
    this.breakdown = { ...breakdown };
    this.missingSections = { ...missing_sections };
    this.missingSkills = Array.isArray(missing_skills) ? [...missing_skills] : [];
    this.presentSkills = Array.isArray(present_skills) ? [...present_skills] : [];
    this.improvementSuggestions = Array.isArray(improvement_suggestions) ? [...improvement_suggestions] : [];
    this.notes = notes;
  }

  // Static factory
  static fromJSON(json) {
    if (typeof json === 'string') json = JSON.parse(json);
    return new ResumeData(json);
  }

  // Convert back to JSON-friendly object
  toJSON() {
    return {
      valid: this.valid,
      score: this.score,
      rating: this.rating,
      breakdown: { ...this.breakdown },
      missing_sections: { ...this.missingSections },
      missing_skills: [...this.missingSkills],
      present_skills: [...this.presentSkills],
      improvement_suggestions: [...this.improvementSuggestions],
      notes: this.notes
    };
  }

  // Basic validation (returns { ok: bool, errors: [] })
  validate() {
    const errors = [];
    if (typeof this.valid !== 'boolean') errors.push('valid must be boolean');
    if (typeof this.score !== 'number' || this.score < 0 || this.score > 100) errors.push('score must be number 0-100');
    if (!this.rating) errors.push('rating is empty');
    if (typeof this.breakdown !== 'object') errors.push('breakdown should be an object');
    return { ok: errors.length === 0, errors };
  }

  // Average of breakdown (ignores non-number values)
  getAverageBreakdown() {
    const vals = Object.values(this.breakdown).filter(v => typeof v === 'number' && !Number.isNaN(v));
    if (vals.length === 0) return 0;
    const sum = vals.reduce((a, b) => a + b, 0);
    return +(sum / vals.length).toFixed(2);
  }

  // Return missing sections that actually have text (non-empty)
  getMissingSections() {
    return Object.entries(this.missingSections)
      .filter(([_, v]) => typeof v === 'string' && v.trim() !== '')
      .map(([k, v]) => ({ section: k, message: v }));
  }

  // Return boolean if there are missing skills
  hasMissingSkills() {
    return this.missingSkills.length > 0;
  }

  // Return lists (copies) for immutability
  getMissingSkills() { return [...this.missingSkills]; }
  getPresentSkills() { return [...this.presentSkills]; }
  getImprovementSuggestions() { return [...this.improvementSuggestions]; }
}

