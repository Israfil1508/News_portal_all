'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    await queryInterface.bulkInsert('articles', [
      {
        title: 'The Future of Artificial Intelligence in 2026',
        slug: 'future-of-artificial-intelligence-2026-' + Date.now(),
        summary: 'Exploring the latest advancements in AI and what they mean for the future of technology and society.',
        content: `Artificial Intelligence continues to evolve at an unprecedented pace. In 2026, we're seeing remarkable breakthroughs in machine learning, natural language processing, and computer vision that are reshaping industries across the globe.

The integration of AI into everyday applications has become seamless, from smart home devices to healthcare diagnostics. Major tech companies are investing billions in AI research, leading to innovations that were once thought impossible.

One of the most significant developments is the advancement in generative AI, which can now create highly realistic content, assist in complex problem-solving, and even contribute to scientific research. This technology is being used in creative industries, education, and business analytics.

However, with these advancements come important ethical considerations. The tech community is actively working on frameworks for responsible AI development, ensuring that these powerful tools are used for the benefit of society while minimizing potential risks.

Looking ahead, experts predict that AI will continue to transform how we work, learn, and interact with technology. The key will be balancing innovation with responsibility, ensuring that AI serves humanity's best interests.`,
        image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        status: 'published',
        view_count: 1250,
        is_featured: true,
        published_at: now,
        author_id: 2,
        category_id: 1,
        created_at: now,
        updated_at: now
      },
      {
        title: 'Global Markets See Record Growth in Q1 2026',
        slug: 'global-markets-record-growth-q1-2026-' + (Date.now() + 1),
        summary: 'Stock markets worldwide experience unprecedented gains as economic recovery accelerates.',
        content: `Financial markets around the world have posted remarkable gains in the first quarter of 2026, signaling a robust economic recovery following years of uncertainty.

The S&P 500 reached new all-time highs, driven by strong corporate earnings and renewed investor confidence. Technology stocks led the charge, with major companies reporting better-than-expected results.

Emerging markets also showed significant strength, attracting foreign investment as developing economies demonstrate resilience and growth potential. The diversification of global supply chains has contributed to this positive trend.

Central banks have maintained supportive monetary policies while carefully managing inflation concerns. The balance between stimulating growth and ensuring price stability remains a key focus for policymakers worldwide.

Analysts are cautiously optimistic about the remainder of the year, though they note potential headwinds including geopolitical tensions and ongoing supply chain adjustments. The consensus is that disciplined investing and diversification remain crucial strategies for navigating the current market environment.`,
        image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
        status: 'published',
        view_count: 890,
        is_featured: true,
        published_at: now,
        author_id: 2,
        category_id: 2,
        created_at: now,
        updated_at: now
      },
      {
        title: 'Championship Finals Set New Viewership Records',
        slug: 'championship-finals-viewership-records-' + (Date.now() + 2),
        summary: 'The annual championship series attracts millions of viewers worldwide, breaking previous records.',
        content: `This year's championship finals have captivated audiences around the globe, setting new records for viewership across multiple platforms and regions.

The thrilling series featured intense competition between the top-ranked teams, with dramatic comebacks and outstanding individual performances that kept fans on the edge of their seats.

Digital streaming platforms reported unprecedented concurrent viewers, reflecting the growing trend of sports consumption shifting to online channels. Social media engagement also reached new heights, with millions of posts, comments, and reactions throughout the series.

The success of this year's championship highlights the evolving landscape of sports broadcasting and fan engagement. Teams and leagues are increasingly leveraging technology to create immersive experiences for viewers, from enhanced statistics to interactive features.

Sports analysts note that this level of engagement bodes well for the future of professional sports, as younger audiences continue to embrace new ways of following their favorite teams and athletes.`,
        image_url: 'https://images.unsplash.com/photo-1461896836934- voices-and-sports?w=800',
        status: 'published',
        view_count: 2100,
        is_featured: false,
        published_at: now,
        author_id: 1,
        category_id: 3,
        created_at: now,
        updated_at: now
      },
      {
        title: 'Breakthrough in Renewable Energy Storage',
        slug: 'breakthrough-renewable-energy-storage-' + (Date.now() + 3),
        summary: 'Scientists announce major advancement in battery technology that could revolutionize clean energy adoption.',
        content: `Researchers have unveiled a groundbreaking battery technology that promises to address one of the biggest challenges in renewable energy: efficient storage.

The new battery system offers significantly higher energy density and longer lifespan than current lithium-ion technologies, while using more abundant and environmentally friendly materials. This development could accelerate the global transition to clean energy.

The technology emerged from years of collaborative research between universities and private sector partners. It represents a significant step forward in making renewable energy more practical and cost-effective for widespread adoption.

Energy experts are particularly excited about the potential applications in grid-scale storage, electric vehicles, and portable electronics. The technology could help address the intermittency issues that have historically limited solar and wind power.

Industry leaders are already exploring commercialization pathways, with pilot projects expected to begin within the next two years. If successful, this breakthrough could reshape the energy landscape for decades to come.`,
        image_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
        status: 'published',
        view_count: 750,
        is_featured: true,
        published_at: now,
        author_id: 2,
        category_id: 6,
        created_at: now,
        updated_at: now
      },
      {
        title: 'New Study Reveals Benefits of Mediterranean Diet',
        slug: 'mediterranean-diet-health-benefits-study-' + (Date.now() + 4),
        summary: 'Comprehensive research confirms the long-term health benefits of following a Mediterranean-style eating pattern.',
        content: `A comprehensive long-term study has provided compelling evidence for the health benefits of the Mediterranean diet, reinforcing its reputation as one of the healthiest eating patterns in the world.

The research, which followed thousands of participants over more than a decade, found significant reductions in cardiovascular disease, diabetes, and cognitive decline among those who adhered to Mediterranean dietary principles.

Key components of the diet include abundant fruits and vegetables, whole grains, legumes, nuts, olive oil as the primary fat source, moderate fish consumption, and limited red meat. The social aspects of meals, including eating with family and friends, are also considered important.

Nutritionists emphasize that the Mediterranean diet is not just about individual foods but represents an overall lifestyle approach to eating. The focus on whole, minimally processed foods and the enjoyment of meals aligns with broader wellness principles.

Healthcare providers are increasingly recommending Mediterranean-style eating patterns to patients, particularly those at risk for chronic diseases. The accessibility and variety of foods make it a practical choice for many people seeking to improve their health.`,
        image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
        status: 'published',
        view_count: 620,
        is_featured: false,
        published_at: now,
        author_id: 1,
        category_id: 5,
        created_at: now,
        updated_at: now
      },
      {
        title: 'International Summit Addresses Climate Change',
        slug: 'international-summit-climate-change-' + (Date.now() + 5),
        summary: 'World leaders convene to discuss ambitious new targets for reducing greenhouse gas emissions.',
        content: `Representatives from over 190 countries gathered this week for a landmark international summit focused on accelerating action against climate change.

The summit featured discussions on updated emissions targets, financing for climate adaptation in developing nations, and mechanisms for technology transfer. Several major economies announced enhanced commitments to achieve carbon neutrality.

Key topics included the phase-down of fossil fuels, protection of natural carbon sinks like forests and oceans, and investment in renewable energy infrastructure. The role of the private sector in driving the green transition was also highlighted.

Climate scientists presented the latest research on global warming trends and their potential impacts, emphasizing the urgency of immediate action. The data underscored both the challenges ahead and the opportunities presented by clean energy technologies.

While negotiations continue on some points, observers note significant progress compared to previous summits. The coming months will be crucial for translating commitments into concrete policies and actions at the national level.`,
        image_url: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800',
        status: 'published',
        view_count: 430,
        is_featured: false,
        published_at: now,
        author_id: 2,
        category_id: 7,
        created_at: now,
        updated_at: now
      },
      {
        title: 'Award Season Preview: Films to Watch',
        slug: 'award-season-preview-films-watch-' + (Date.now() + 6),
        summary: 'A look at the most anticipated films competing for recognition this award season.',
        content: `As award season approaches, film enthusiasts and industry insiders are speculating about which movies will earn top honors at the upcoming ceremonies.

This year's lineup features an impressive array of films spanning multiple genres, from intimate character studies to sweeping epics. Several debut directors have emerged as strong contenders, bringing fresh perspectives to the screen.

Critics have particularly praised performances by both established stars and newcomers, with several actors generating buzz for transformative roles. The competition in major acting categories is expected to be especially fierce.

Technical achievements in cinematography, visual effects, and sound design have also drawn attention, reflecting the continued innovation in filmmaking technology. International productions are well-represented, highlighting the global nature of contemporary cinema.

Industry analysts note that audience engagement has been strong for many of this year's contenders, suggesting that quality and commercial appeal are not mutually exclusive. The coming weeks will reveal which films resonate most with award voters and audiences alike.`,
        image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
        status: 'published',
        view_count: 580,
        is_featured: false,
        published_at: now,
        author_id: 1,
        category_id: 4,
        created_at: now,
        updated_at: now
      },
      {
        title: 'Tech Giants Announce New Privacy Features',
        slug: 'tech-giants-privacy-features-' + (Date.now() + 7),
        summary: 'Major technology companies introduce enhanced privacy controls in response to user demands.',
        content: `Leading technology companies have announced significant updates to their privacy policies and tools, giving users more control over their personal data.

The new features include more granular permission settings, improved data transparency dashboards, and enhanced options for limiting data collection and sharing. These changes come in response to growing consumer awareness about digital privacy.

Privacy advocates have welcomed the announcements while noting that implementation details will be crucial. The balance between personalization and privacy remains a key challenge for companies that rely on data for their business models.

Regulatory pressures have also played a role in driving these changes, as governments worldwide continue to strengthen data protection laws. Companies are increasingly viewing privacy as both a compliance requirement and a competitive advantage.

Industry observers expect privacy to remain a central focus in technology development, with continued innovation in privacy-preserving technologies and practices. Users are encouraged to explore the new settings and make informed choices about their data.`,
        image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
        status: 'published',
        view_count: 340,
        is_featured: false,
        published_at: now,
        author_id: 2,
        category_id: 1,
        created_at: now,
        updated_at: now
      },
      {
        title: 'Draft Article: Upcoming Product Launch',
        slug: 'draft-upcoming-product-launch-' + (Date.now() + 8),
        summary: 'Preview of the anticipated product announcement expected next month.',
        content: `This is a draft article that will be published once the official announcement is made.

The upcoming product launch is expected to introduce several innovative features that could reshape the industry. Early reports suggest significant improvements in performance, design, and user experience.

Details remain limited at this time, but industry sources indicate that the announcement will take place during the company's annual developer conference. Pre-orders may begin shortly after the unveiling.

Analysts predict strong consumer interest based on the company's track record and the competitive landscape. The timing of the launch coincides with key shopping seasons, suggesting a strategic approach to market entry.

[This section will be updated with official specifications and pricing once available.]

More information will be added as the announcement date approaches. Stay tuned for comprehensive coverage of this highly anticipated release.`,
        image_url: null,
        status: 'draft',
        view_count: 0,
        is_featured: false,
        published_at: null,
        author_id: 2,
        category_id: 1,
        created_at: now,
        updated_at: now
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};
