import setup from './setup';
import es from './example/EventSubscriptions';
import ic from './example/InteractiveComponents';

setup(async (props) => {
  es(props);
  ic(props);
});
