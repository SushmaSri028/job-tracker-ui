// All the math lives in one place — testable and reusable

export function getStatusBreakdown(applications) {
  const counts = {};
  applications.forEach((app) => {
    counts[app.status] = (counts[app.status] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function getTopCompanies(applications, limit = 5) {
  const counts = {};
  applications.forEach((app) => {
    if (app.company) {
      counts[app.company] = (counts[app.company] || 0) + 1;
    }
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getApplicationsOverTime(applications, weeks = 12) {
  // Build last N weeks (label = week start date)
  const buckets = [];
  const now = new Date();
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);
    // Normalize to start of week (Sunday)
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    buckets.push({
      week: weekStart.toISOString().slice(5, 10),  // "MM-DD"
      count: 0,
      _start: weekStart.getTime(),
    });
  }

  applications.forEach((app) => {
    if (!app.appliedDate) return;
    const appliedTime = new Date(app.appliedDate).getTime();
    for (let i = buckets.length - 1; i >= 0; i--) {
      const next = buckets[i + 1]?._start ?? Infinity;
      if (appliedTime >= buckets[i]._start && appliedTime < next) {
        buckets[i].count++;
        return;
      }
    }
  });

  return buckets.map(({ _start, ...rest }) => rest);
}

export function getResponseRate(applications) {
  // Response = anything beyond APPLIED (someone responded)
  if (applications.length === 0) return 0;
  const responded = applications.filter(
    (a) => !['APPLIED', 'GHOSTED'].includes(a.status)
  ).length;
  return Math.round((responded / applications.length) * 100);
}

export function getOfferRate(applications) {
  if (applications.length === 0) return 0;
  const offers = applications.filter((a) =>
    ['OFFER', 'ACCEPTED'].includes(a.status)
  ).length;
  return Math.round((offers / applications.length) * 100);
}

export function getAvgDaysApplied(applications) {
  // Average days since application was created
  const withDates = applications.filter((a) => a.appliedDate);
  if (withDates.length === 0) return 0;
  const now = Date.now();
  const totalDays = withDates.reduce((sum, app) => {
    const days = Math.floor((now - new Date(app.appliedDate).getTime()) / (1000 * 60 * 60 * 24));
    return sum + days;
  }, 0);
  return Math.round(totalDays / withDates.length);
}
export function getStaleApplications(applications, daysThreshold = 14) {
  const now = Date.now();
  const thresholdMs = daysThreshold * 24 * 60 * 60 * 1000;

  return applications.filter((app) => {
    // Only consider "active in pipeline" statuses
    if (!['SCREENING', 'INTERVIEW'].includes(app.status)) return false;
    if (!app.updatedAt) return false;
    const updatedTime = new Date(app.updatedAt).getTime();
    return now - updatedTime > thresholdMs;
  });
}