import router from '@/modules/Router/Router';
import { resolveUrl } from '@/modules/UrlUtils/UrlUtils';
import { SurveyPage } from '@survey/pages/survey_page/SurveyPage';
import { SurveyStatsPage } from './pages/survey_stats/SurveyStatsPage';

router.addRoute(resolveUrl('survey', null).pathname, SurveyPage);
router.addRoute(resolveUrl('surveyStats', null).pathname, SurveyStatsPage);

router.start();
